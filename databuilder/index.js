
const secretKeys = require('../secrets.json');

const fs = require('fs');
const https = require('https');

/**
 * Bottleneck - Task Scheduler / Rate limiter
 * @see {@link https://github.com/SGrondin/bottleneck}
 */
const Bottleneck = require('bottleneck');
/**
 * MovieDB - themoviedb.org client
 * @see {@link https://www.npmjs.com/package/moviedb}
 */
const MovieDB = require('moviedb')(secretKeys.tmdb);

/**
 * Original JSON data from SF OpenData
 * @see {@link https://data.sfgov.org/Culture-and-Recreation/Film-Locations-in-San-Francisco/yitu-d5am}
 */
const origData = require('./resources/sfgov/sfmovies.json').data;

/**
 * Delay between calls to TMDb
 */
const THROTTLE_DELAY = 400;
/**
 * Number of concurrent calls to TMDb
 */
const CONCURRENCY = 1;

function geocode(address) {
	var options = {
		hostname: 'maps.googleapis.com',
		port: 443,
		method: 'GET',
		path:
			'/maps/api/geocode/json?key=' +
			secretKeys.gmap +
			'&address=' + encodeURIComponent(address) +
			// Only search within the area of San Francisco
			'&bounds=37.5859422986,-122.5579833984|37.8184631951,-122.3114776611' +
			'&components=' +
				'locality:SF|' +
				'administrative_area:San%20Francisco%20County|' +
				'country:US'
	};
	let data = '';
	return new Promise(function(resolve, reject) {
		var req = https.request(options, (res) => {
			res.on('data', (d) => {
				data += d;
			});
			res.on('end', () => {
				try {
					data = JSON.parse(data);
				} catch (e) {
					console.warn('[GEO] Failed to parse JSON: ', data);
					return reject({});
				}
				return resolve(data);
			});
		});
		req.end();

		req.on('error', (e) => {
			throw new Error(e);
		});
	});
}

let storage = {
	finalMovieData: [],
	problemMovieData: []
};

function trim(str) {
	return str ? str.trim() : '';
}

/**
 * Transform and simplify a line of the SF OpenData JSON
 */
function readMovieData(m) {
	return {
		movie: {
			id: trim(m[1]),

			title: trim(m[8]),
			year: trim(m[9]),

			director: trim(m[14]),
			writers: trim(m[15]).replace(/(,\s)|(\s,)/g, ',').split(','),
			actors: [
				trim(m[16]),
				trim(m[17]),
				trim(m[18])
			]
		},
		location: {
			location: trim(m[10]),
			funFacts: trim(m[11])
		}
	};
}

/**
 * Transform and simplify the whole SF OpenData JSON
 * Also removes any series from the list, we only need the movies.
 * Also removes any line that doesn't contain location information.
 */
function simplifyOrigData() {
	let simpleMovies = {};
	origData.forEach(function(mLocationLine) {
		let mData = readMovieData(mLocationLine);
		let mId = mData.movie.title.trim() + ' (' + mData.movie.year + ')';

		// Remove lines without any location info
		if (!mData.location.location) {
			console.log('[FLT] Removing "' + mId + '", it doesn\'t have location info');
			return;
		}
		// Remove any series
		const seriesRegex =
			/(season(.*)ep)|(,(.*)pilot)|(episode(.*)\d)|(season(.*)\d)/gi;
		if (mData.movie.title.match(seriesRegex) !== null) {
			console.log('[FLT] Removing "' + mId + '", it\'s a series, not a movie');
			return;
		}

		if (simpleMovies[mId]) {
			simpleMovies[mId].location.push(mData.location)
		} else {
			simpleMovies[mId] = {
				movie: mData.movie,
				location: [mData.location]
			};
		}
	});
	return simpleMovies;
}

function searchMovie(movie) {
	return new Promise(function(resolve, reject) {
		console.log('>>>>> Searching for ' +
			movie.movie.title + ' (' + movie.movie.year + ')'
		);
		MovieDB.searchMovie({
			language: 'en-US',
			include_adult: false,
			query: movie.movie.title,
			year: movie.movie.year,
			primary_release_year: movie.movie.year,
		}, (err, res) => {
			if (err) {
				console.error(
					'[SRC] Something went wrong while trying to query for the movie:'
					+ movie.movie.title
				);
				throw new Error(data); // Propagates down to the final `catch`
			}
			let data = {
				res: res,
				movie: movie,
			};
			if (res.results.length <= 1) {
				return resolve(data); // Handled by `storeMovieResult`
			} else {
				return reject(data); // Handled by `checkResults`
			}
		});
	});
}
function checkResults(data) {
	return new Promise(function(resolve, reject) {
		if (data instanceof Error) {
			throw new Error(data); // Propagates down to the final `catch`
		}
		const res = data.res;
		const movie = data.movie;
		// Single movie returned
		if (res.results.length === 1) {
			console.log('[CHK] Found 1 result');
			return resolve({ // Handled by `storeMovieResult`
				mResult: res.results[0],
				movie: movie
			});
		}

		// Multiple movies returned, let's choose the right one
		if (res.results.length > 1) {
			console.log('[CHK] Found multiple results');
		}

		// If we didn't get any results or didn't find a match,
		// still add it to the list
		if (res.results.length === 0) {
			console.warn('[CHK] No results');
		}
		return reject({ // Handled by `matchByCredits`
			results: res.results,
			movie: movie
		});
	});
}
function matchByCredits(data) {
	return new Promise(function(resolve, reject) {
		if (data instanceof Error) {
			throw new Error(data); // Propagates down to the final `catch`
		}

		const results = data.results;
		const movie = data.movie;
		if (results.length === 0) {
			return reject({ // Handled by `catchNoResult`
				movie: movie
			});
		}

		let creditPromises = [];
		results.some(function(mRes) {
			// Remove fuzzy matching results
			let origTitle = trim(mRes.original_title);
			if (origTitle.toLowerCase() !== movie.movie.title.toLowerCase()) {
				return false; // Break `some`
			}

			creditPromises.push(
				new Promise(function(resolve, reject) {
					let matchFound = true;
					// Try to do matching based on the cast or crew of the movie
					MovieDB.movieCredits({
						id: mRes.id
					}, (creditErr, creditRes) => {
						let matchFound = false;
						if (creditErr) {
							console.error(
								'[CRW] Something went wrong while trying to get credits for the movie:'
								+ movie.movie.title,
								creditErr
							);
							return reject({ // Propagates down to the final `catch`
								err: creditErr
							});
						}

						// Try to match based on the director or writers
						const crew = creditRes.crew;
						if ((movie.movie._director || movie.movie.writers) && crew) {
							crew.some(function(crewMember) {
								if (
									(
										crewMember.job === 'Director' &&
										crewMember.name === movie.movie.director
									) ||
									(
										crewMember.job === 'Writer' &&
										movie.movie.writers.indexOf(crewMember.name) !== -1
									)
								) {
									matchFound = true;
									return true; // Break `some`
								}
							});
						}

						// Try to match based on the actors
						const cast = creditRes.cast;
						if (!matchFound && movie.movie._actors && cast) {
							cast.some(function(castMember) {
								if (movie.movie._actors.indexOf(castMember.name) !== -1) {
									matchFound = true;
									return true; // Break `some`
								}
							});
						}

						if (matchFound) {
							return resolve({ // Handled by `handleCreditLookupResults`
								matchFound: matchFound,
								mResult: mRes,
								movie: movie
							});
						} else {
							// Because I'm using `Promise.all`, I have to resolve here to
							// make sure that it doesn't reject the whole chain because
							// one of the movies didn't return the right results.
							// `Promise.all` will fail-fast and one `reject` will reject all.
							return resolve({ // Handled by `handleCreditLookupResults`
								matchFound: matchFound,
								mResult: {},
								movie: movie
							});
						}
					});
				})
			);
		});
		Promise
			.all(creditPromises)
			.then(function handleCreditLookupResults(creditLookupResults) {
				return new Promise(function(innerResolve, innerReject) {
					let creditLookupMatchFound = {
						idx: -1,
						val: false
					};
					creditLookupResults.some(function(creditLookupResult, idx) {
						if (creditLookupResult.matchFound) {
							creditLookupMatchFound = {
								idx: idx,
								val: true
							};
							return true;
						}
					});
					if (creditLookupMatchFound.val) {
						console.log('[CRW] Match found based on cast and crew');
						innerResolve(
							creditLookupResults[creditLookupMatchFound.idx]
						); // Handled by `storeMovieResult`
					} else {
						console.log('[CRW] Could not match based on cast and crew');
						if (creditLookupResults.length) {
							innerReject(creditLookupResults[0]); // Handled by `catchNoResult`
						} else {
							innerReject({
								mResult: {},
								movie: movie
							}); // Handled by `catchNoResult`
						}
					}
				});
			})
			.then(resolve)
			.catch(reject);
	});
}

function geocodeLocations(data) {
	if (data instanceof Error) {
		throw new Error(data); // Propagates down to the final `catch`
	}
	return new Promise(function(resolve, reject) {
		const movie = data.movie;
		const mResult = data.mResult;
		const res = data.res;

		if (data.skipGeo) {
			return resolve(data);
		}

		let locationPromises = [];
		movie.location.forEach(function(location) {
			locationPromises.push(geocode(location.location));
		});
		console.log('[GEO] Locating ' + locationPromises.length + ' addresses');
		return Promise
			.all(locationPromises)
			.then(function(locations) {
				let geocodeCounter = 0;
				locations.forEach(function(location, idx) {
					movie.location[idx] = {
						funFacts: movie.location[idx].funFacts,
						origAddress: movie.location[idx].location,
					};
					console.log('[GEO] Searched for:  ', movie.location[idx].origAddress);
					if (location.status === 'OK') {
						const geocodedAddress = location.results[0];
						if (geocodedAddress.formatted_address) {
							++geocodeCounter;
							movie.location[idx].address = geocodedAddress.formatted_address;
							console.log('[GEO] Found address: ', movie.location[idx].address);
						}
						if (
							geocodedAddress.geometry &&
							geocodedAddress.geometry.location
						) {
							movie.location[idx].lat =
								geocodedAddress.geometry.location.lat;
							movie.location[idx].lon =
								geocodedAddress.geometry.location.lng;
						}
					} else {
						// console.log('Kept original address');
					}
				});
				return resolve({
					movie: movie,
					mResult: mResult,
					res: res
				});
			})
			.then(resolve)
			.catch(reject);
	});
}

function storeMovieResult(data) {
	return new Promise(function(resolve, reject) {
		if (data instanceof Error) {
			throw new Error(data); // Propagates down to the final `catch`
		}

		const res = data.res;
		const movie = data.movie;
		let mResult;

		if (res && res.results.length === 1) {
			mResult = res.results[0];
		} else {
			mResult = data.mResult;
		}
		if (!mResult) {
			return reject({ // Handled by `catchNoResult`
				skipGeo: true,
				movie: movie
			});
		}
		console.log('[STR] Storing result');
		delete movie.movie.director;
		delete movie.movie.writers;
		delete movie.movie.actors;
		storage.finalMovieData.push({
			movie: Object.assign({}, movie.movie, {
				tmdbId: mResult.id,

				title: mResult.original_title,
				// overview: mResult.overview,
				// language: mResult.original_language,
				genres: mResult.genre_ids,

				posterPath: mResult.poster_path,
				// backdropPath: mResult.backgrop_path,

				// popularity: mResult.popularity,
				voteAverage: mResult.vote_average,
				voteCount: mResult.vote_count
			}),
			locations: movie.location
		});
		return resolve('Stored result');
	});
}

function catchNoResult(data) {
	return new Promise(function(resolve, reject) {
		if (data instanceof Error) {
			throw new Error(data); // Propagates down to the final `catch`
		}

		console.log('[NRH] No search results, storing original data');
		const movie = data.movie;
		storage.problemMovieData.push({
			title: movie.movie.title + ' (' + movie.movie.year + ')',
			err: 'No results',
			movie: movie
		});
		storage.finalMovieData.push({
			movie: movie.movie,
			locations: movie.location
		});
		return resolve('No search results found, movie still added'); // Final `resolve`
	});
}

function enrichMovieData() {
	const searchLimiter = new Bottleneck(CONCURRENCY, THROTTLE_DELAY);
	const movieData = simplifyOrigData();

	Object.keys(movieData).forEach(function(key) {
		searchLimiter.schedule(function(movie) {
			// var promise =
			// 	searchMovie(movie)
			// 	.catch(function(data) {
			// 		console.log('checkResults', data);
			// 		return checkResults(data);
			// 	})
			// 	.catch(function(data) {
			// 		console.log('matchByCredits', data);
			// 		return matchByCredits(data);
			// 	})
			// 	.then(function(data) {
			// 		console.log('+geocodeLocations', data);
			// 		return geocodeLocations(data);
			// 	}) // @TODO have only 1
			// 	.then(function(data) {
			// 		console.log('storeMovieResult', data);
			// 		return storeMovieResult(data);
			// 	})
			// 	.catch(function(data) {
			// 		console.log('-geocodeLocations', data);
			// 		return geocodeLocations(data);
			// 	}) // @TODO have only 1
			// 	.catch(function(data) {
			// 		console.log('catchNoResult', data);
			// 		return catchNoResult(data);
			// 	})
			// 	.catch(function(err) {
			// 		console.error('Something went wrong!');
			// 		console.error(err);
			// 	});
			let promise =
				searchMovie(movie)
				.catch(checkResults)
				.catch(matchByCredits)
				.then(geocodeLocations) // @TODO have only 1
				.then(storeMovieResult)
				.catch(geocodeLocations) // @TODO have only 1
				.catch(catchNoResult)
				.catch(function(err) {
					console.error('Something went wrong!');
					console.error(err);
				});
			return promise;
		}, movieData[key]);
	});

	setTimeout(function() {
		searchLimiter.on('idle', function () {
			fs.writeFile('./output/allmovies.json', JSON.stringify(storage.finalMovieData, null, 4), (err) => {
				if (err) {
					throw err;
				}
				console.log('Movie file saved!');
			});
			fs.writeFile('./output/problemmovies.json', JSON.stringify(storage.problemMovieData, null, 4), (err) => {
				if (err) {
					throw err;
				}
				console.log('Problem movie file saved!');
			});
		});
	}, 0);
}

enrichMovieData();
