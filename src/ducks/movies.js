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
			return Object.assign({}, state, {
				activeMovie: action.movie
			});
		case SET_ALL_MOVIES:
			return Object.assign({}, state, {
				allMovies: action.allMovies
			});
		case SET_VISIBLE_MOVIES:
			return Object.assign({}, state, {
				visibleMovies: action.visibleMovies
			});
		case SET_GENRES:
			return Object.assign({}, state, {
				genres: action.genres
			});

		case SET_SHOW_TRAILER:
			return Object.assign({}, state, {
				showTrailer: action.showTrailer
			});

		case SET_SEARCH_QUERY:
			return Object.assign({}, state, {
				searchQuery: action.searchQuery
			});
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
			dispatch(uiActions.setLoading(true));

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
							throw new Error('Failure while loading movies.', e);
						}

						dispatch(uiActions.setLoading(false));
						dispatch(setAllMovies(movies));
						return resolve(dispatch(setVisibleMovies(movies)));
					}
				}
			);
		});
	};
}
export function fetchAllMoviesAndShowMovieList() {
	return (dispatch, getState) => {
		return dispatch(fetchAllMovies()).then(() => navToMovieList());
	};
}

export function fetchGenres() {
	return (dispatch, getState) => {
		if (getState().movies.genres.length) {
			return Promise.resolve();
		}

		return new Promise((resolve, reject) => {
			dispatch(uiActions.setLoading(true));
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
							throw new Error('Failure while loading genres.', e);
						}
						dispatch(uiActions.setLoading(false));
						return resolve(dispatch(setGenres(genres)));

					}
				}
			);
		});
	};
}
export function fetchMovieFromTMDbAndSetActive(movie) {
	return (dispatch, getState) => {
		return new Promise((resolve, reject) => {
			dispatch(uiActions.setLoading(true));

			if (movie.movie.tmdbId) {
				let enrichedMovie = {
					movie: Object.assign({}, movie.movie),
					locations: Object.assign({}, movie.locations)
				};
				MovieDB.movieInfo({id: movie.movie.tmdbId}, (err, res) => {
					if (res) {
						// merge movie objects in redux
						enrichedMovie = Object.assign({}, {
							movie: Object.assign({},
								movie.movie,
								{
									imdbId: res.imdbId,
									overview: res.overview,
									releaseDate: res.release_date,
									budget: res.budget,
									revenue: res.revenue,
									runtime: res.runtime,
									tagline: res.tagline,
									backdropPath: res.backdrop_path
								}
							),
							locations: movie.locations
						});
					} else {
						return resolve(movie);
					}
				}).movieVideos({id: movie.movie.tmdbId}, (err, res) => {
					if (res && res.results.length) {
						var youtubeVideos = res.results.filter(function(obj) {
							return (obj.site.toLowerCase() === 'youtube');
						});
						if (youtubeVideos.length) {
							enrichedMovie = Object.assign({}, {
								movie: Object.assign({},
									enrichedMovie.movie,
									{
										youtubeTrailerId: youtubeVideos[0].key
									}
								),
								locations: movie.locations
							});
						}
					}
					return resolve(enrichedMovie);
				});
			} else {
				return resolve(movie);
			}
		}).then((movie) => dispatch(showMovieOnMap(movie)));
	};
}
export function loadMovieById(id) {
	return (dispatch, getState) => {
		return new Promise((resolve, reject) => {
			dispatch(uiActions.setLoading(true));

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
					return resolve(dispatch(fetchMovieFromTMDbAndSetActive(activeMovie)));
				} else {
					return resolve(dispatch(navToMovieList()));
				}
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
		const allMovies = getState().movies.allMovies;
		const visibleMovies = allMovies.filter((movie) => {
			return (movie.movie.title.toLowerCase().indexOf(query.toLowerCase()) !== -1);
		});
		return dispatch(setVisibleMovies(visibleMovies));
	}
}
