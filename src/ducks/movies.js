import request from 'request';
import { history } from '../app/store';
import * as uiActions from './ui';
import MovieDBClient from 'moviedb';
import secretKeys from '../../secrets.json';
const MovieDB = MovieDBClient(secretKeys.tmdb);

// Actions
const SET_ACTIVE_MOVIE = 'sfmovies/movies/SET_ACTIVE_MOVIE';
const SET_ALL_MOVIES = 'sfmovies/movies/SET_ALL_MOVIES';
const SET_VISIBLE_MOVIES = 'sfmovies/movies/SET_VISIBLE_MOVIES';
const SET_GENRES = 'sfmovies/movies/SET_GENRES';

const SET_SEARCH_QUERY = 'sfmovies/movies/SET_SEARCH_QUERY';

const SET_SHOW_TRAILER = 'sfmovies/movies/SET_SHOW_TRAILER';

const MOVIES_INIT = {
	allMovies: [],
	visibleMovies: [],
	genres: {},
	activeMovie: {},

	searchQuery: '',

	showTrailer: false
};

// Reducer
export default function reducer(state = MOVIES_INIT, action = {}) {
	switch (action.type) {
		case SET_ACTIVE_MOVIE:
			return {
				...state,
				activeMovie: action.movie
			};
		case SET_ALL_MOVIES:
			return {
				...state,
				allMovies: action.allMovies
			};
		case SET_VISIBLE_MOVIES:
			return {
				...state,
				visibleMovies: action.visibleMovies
			};
		case SET_GENRES:
			return {
				...state,
				genres: action.genres
			};

		case SET_SHOW_TRAILER:
			return {
				...state,
				showTrailer: action.showTrailer
			};

		case SET_SEARCH_QUERY:
			return {
				...state,
				searchQuery: action.searchQuery
			};
		default:
			return state;
	}
}

// Action Creators
export function setActiveMovie(movie) {
	return {
		type: SET_ACTIVE_MOVIE,
		movie
	};
}
export function setAllMovies(allMovies) {
	return {
		type: SET_ALL_MOVIES,
		allMovies
	};
}
export function setVisibleMovies(visibleMovies) {
	return {
		type: SET_VISIBLE_MOVIES,
		visibleMovies
	};
}
export function setGenres(genres) {
	return {
		type: SET_GENRES,
		genres
	};
}
export function setShowTrailer(showTrailer) {
	return {
		type: SET_SHOW_TRAILER,
		showTrailer
	};
}
export function setSearchQuery(searchQuery) {
	return {
		type: SET_SEARCH_QUERY,
		searchQuery
	};
}

export function navToMovieList() {
	return (dispatch, getState) => {
		history.push({
			search: '/'
		});
	};
}
export function fetchAllMovies() {
	return (dispatch, getState) => {
		if (getState().movies.allMovies.length) {
			Promise.resolve();
		}

		return new Promise((resolve, reject) => {
			dispatch(uiActions.retain());

			request(
				window.location.protocol +
				'//' +
				window.location.host +
				process.env.PUBLIC_URL +
				'/static/movies.json',
				(err, res, body) => {
					if (!err && res.statusCode === 200) {
						let movies = [];
						try {
							movies = JSON.parse(body);
						} catch (e) {
							dispatch(uiActions.release());
							throw new Error('Failure while loading movies.', e);
						}

						dispatch(uiActions.release());
						dispatch(setAllMovies(movies));
						return resolve(dispatch(setVisibleMovies(movies)));
					}
				}
			);
		});
	};
}
export function fetchAllMoviesAndShowMovieList() {
	return (dispatch, getState) => (
		dispatch(fetchAllMovies()).then(() => navToMovieList())
	);
}

export function fetchGenres() {
	return (dispatch, getState) => {
		if (getState().movies.genres.length) {
			return Promise.resolve();
		}

		return new Promise((resolve, reject) => {
			dispatch(uiActions.retain());
			request(
				window.location.protocol +
				'//' +
				window.location.host +
				process.env.PUBLIC_URL +
				'/static/genres.json',
				(err, res, body) => {
					if (!err && res.statusCode === 200) {
						let genres = [];
						try {
							genres = JSON.parse(body);
						} catch (e) {
							dispatch(uiActions.release());
							throw new Error('Failure while loading genres.', e);
						}
						dispatch(uiActions.release());
						return resolve(dispatch(setGenres(genres)));
					} else {
						dispatch(uiActions.release());
						throw new Error('Failure while fetching genres.', err);
					}
				}
			);
		});
	};
}
export function fetchMovieFromTMDbAndSetActive(movie) {
	return (dispatch, getState) => (
		new Promise((resolve, reject) => {
			if (movie.movie.tmdbId) {
				new Promise((infoResolve, infoRreject) => {
					dispatch(uiActions.retain());
					let enrichedMovie = {
						movie: {
							...movie.movie
						},
						locations: [...movie.locations]
					};
					MovieDB.movieInfo({id: movie.movie.tmdbId}, (err, res) => {
						if (res) {
							enrichedMovie = {
								movie: {
									...movie.movie,
									imdbId: res.imdbId,
									overview: res.overview,
									releaseDate: res.release_date,
									budget: res.budget,
									revenue: res.revenue,
									runtime: res.runtime,
									tagline: res.tagline,
									backdropPath: res.backdrop_path
								},
								locations: [...movie.locations]
							};
							dispatch(uiActions.release());
							return infoResolve(enrichedMovie);
						} else {
							dispatch(uiActions.release());
							return infoResolve(movie);
						}
					});
				}).then((enrichedMovie) => {
					dispatch(uiActions.retain());
					MovieDB.movieVideos({id: movie.movie.tmdbId}, (err, res) => {
						if (res && res.results.length) {
							const youtubeVideos = res.results.filter(function(obj) {
								return (obj.site.toLowerCase() === 'youtube');
							});
							if (youtubeVideos.length) {
								enrichedMovie = {
									movie: {
										...enrichedMovie.movie,
										youtubeTrailerId: youtubeVideos[0].key
									},
									locations: [...movie.locations]
								};
							}
						}
						dispatch(uiActions.release());
						return resolve(enrichedMovie);
					});
				});
			} else {
				return resolve(movie);
			}
		}).then((movie) => {
			return dispatch(showMovieOnMap(movie));
		})
	);
}
export function loadMovieById(id) {
	return (dispatch, getState) => {
		return new Promise((resolve, reject) => {
			dispatch(uiActions.retain());

			dispatch(fetchGenres()).then(() =>
				dispatch(fetchAllMovies())
			).then(() => {
				const movies = Object.assign({},
					getState().movies.allMovies
				);
				let activeMovie = {};
				Object.keys(movies).some((key) => {
					let movie = movies[key];
					if (movie.movie.id === id) {
						activeMovie = movie;
						return true;
					}
					return false;
				});
				if (activeMovie) {
					dispatch(uiActions.release());
					return resolve(dispatch(fetchMovieFromTMDbAndSetActive(activeMovie)));
				} else {
					dispatch(uiActions.release());
					return resolve(dispatch(navToMovieList()));
				}
			}).catch((e) => {
				dispatch(uiActions.release());
				throw new Error('Error loading movie.', e);
			});
		});
	};
}
export function showMovieOnMap(movie) {
	return (dispatch, getState) => {
		dispatch(setActiveMovie(movie));
		return dispatch(navToMovieMap(movie.movie.id));
	};
}
export function navToMovieMap(movieId) {
	return (dispatch, getState) => {
		const newPath = 'map/' + movieId;
		const currentLocation = history.getCurrentLocation();
		if (currentLocation.pathname.indexOf('/' + newPath) === -1) {
			history.push({
				search: newPath
			});
		}
		return Promise.resolve();
	};
}
export function filterMovies(query) {
	return (dispatch, getState) => {
		dispatch(setSearchQuery(query));
		dispatch(uiActions.retain());
		const allMovies = getState().movies.allMovies;
		const visibleMovies = allMovies.filter((movie) => {
			return (movie.movie.title.toLowerCase().indexOf(query.toLowerCase()) !== -1);
		});
		dispatch(uiActions.release());
		return dispatch(setVisibleMovies(visibleMovies));
	}
}
