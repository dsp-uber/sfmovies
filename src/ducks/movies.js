import request from 'request';
import { push } from 'react-router-redux';
import * as uiActions from './ui';
import secretKeys from '../../secrets.json';
import MovieDBClient from 'moviedb';
const MovieDB = MovieDBClient(secretKeys.tmdb);

// Actions
export const SET_ACTIVE_MOVIE = 'sfmovies/movies/SET_ACTIVE_MOVIE';
export const SET_ALL_MOVIES = 'sfmovies/movies/SET_ALL_MOVIES';
export const SET_VISIBLE_MOVIES = 'sfmovies/movies/SET_VISIBLE_MOVIES';
export const SET_GENRES = 'sfmovies/movies/SET_GENRES';

export const SET_SEARCH_QUERY = 'sfmovies/movies/SET_SEARCH_QUERY';

export const SET_SHOW_TRAILER = 'sfmovies/movies/SET_SHOW_TRAILER';

export const FETCH_ALL_MOVIES_REQUEST = 'sfmovies/movies/FETCH_ALL_MOVIES_REQUEST';
export const FETCH_ALL_MOVIES_AND_SHOW_MOVIE_LIST = 'sfmovies/movies/FETCH_ALL_MOVIES_AND_SHOW_MOVIE_LIST';
export const FETCH_GENRES_REQUEST = 'sfmovies/movies/FETCH_GENRES_REQUEST';
export const FETCH_MOVIE_FROM_TMDB_AND_SET_ACTIVE_REQUEST = 'sfmovies/movies/FETCH_MOVIE_FROM_TMDB_AND_SET_ACTIVE_REQUEST';
export const LOAD_MOVIE_BY_ID = 'sfmovies/movies/LOAD_MOVIE_BY_ID';
export const SHOW_MOVIE_ON_MAP = 'sfmovies/movies/SHOW_MOVIE_ON_MAP';
export const NAV_TO_MOVIE_LIST = 'sfmovies/movies/NAV_TO_MOVIE_LIST';
export const NAV_TO_MOVIE_MAP = 'sfmovies/movies/NAV_TO_MOVIE_MAP';
export const FILTER_MOVIES = 'sfmovies/movies/FILTER_MOVIES';
export const FETCH_TMDB_INFO_REQUEST = 'sfmovies/movies/FETCH_TMDB_INFO_REQUEST';
export const FETCH_TMDB_VIDEOS_REQUEST = 'sfmovies/movies/FETCH_TMDB_VIDEOS_REQUEST';

export const INIT = {
	allMovies: [],
	visibleMovies: [],
	genres: {},
	activeMovie: {},

	searchQuery: '',

	showTrailer: false
};

// Reducer
const reducer = function (state = INIT, action = {}) {
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
export default reducer;

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

const typeAsDispatch = (type) => ({type});

export function navToMovieList() {
	return (dispatch, getState) => {
		dispatch(typeAsDispatch(NAV_TO_MOVIE_LIST));
		return dispatch(push({
			search: ''
		}));
	};
}
export function fetchAllMovies() {
	return (dispatch, getState) => {
		dispatch(typeAsDispatch(FETCH_ALL_MOVIES_REQUEST));
		if (getState().movies.allMovies.length) {
			return Promise.resolve();
		}

		return new Promise((resolve, reject) => {
			dispatch(uiActions.retain());

			request(
				window.location.protocol + '//' + window.location.host +
				process.env.PUBLIC_URL + '/static/movies.json',
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
	return (dispatch, getState) => {
		dispatch(typeAsDispatch(FETCH_ALL_MOVIES_AND_SHOW_MOVIE_LIST));
		return dispatch(fetchAllMovies()).then(() =>
			dispatch(navToMovieList())
		);
	};
}

export function fetchGenres() {
	return (dispatch, getState) => {
		dispatch(typeAsDispatch(FETCH_GENRES_REQUEST));
		if (Object.keys(getState().movies.genres).length) {
			return Promise.resolve();
		}
		return new Promise((resolve, reject) => {
			dispatch(uiActions.retain());
			request(
				window.location.protocol + '//' + window.location.host +
				process.env.PUBLIC_URL + '/static/genres.json',
				(err, res, body) => {
					if (!err && res.statusCode === 200) {
						let genres = {};
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
	return (dispatch, getState) => {
		dispatch(typeAsDispatch(FETCH_MOVIE_FROM_TMDB_AND_SET_ACTIVE_REQUEST));
		return new Promise((resolve, reject) => {
			if (movie.movie.tmdbId) {
				// This is wrapped in a promise, because even though it's possible to
				// chain the MovieDB calls, they will execute parallel.
				/**
				 * @TODO move enrichMovie() to a separate action \
				 * so the calls can run parallel
				*/
				new Promise((infoResolve, infoReject) => {
					let enrichedMovie = {
						movie: {
							...movie.movie
						},
						locations: [...movie.locations]
					};
					dispatch(uiActions.retain());
					dispatch(typeAsDispatch(FETCH_TMDB_INFO_REQUEST));
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
							return infoResolve(enrichedMovie);
						} else {
							return infoResolve(movie);
						}
					});
				}).then((enrichedMovie) => {
					dispatch(typeAsDispatch(FETCH_TMDB_VIDEOS_REQUEST));
					MovieDB.movieVideos({id: movie.movie.tmdbId}, (err, res) => {
						if (res && res.results && res.results.length) {
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
	};
}
export function loadMovieById(id) {
	return (dispatch, getState) => {
		dispatch(typeAsDispatch(LOAD_MOVIE_BY_ID));
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
		dispatch(typeAsDispatch(SHOW_MOVIE_ON_MAP));
		dispatch(setActiveMovie(movie));
		return dispatch(navToMovieMap(movie.movie.id));
	};
}
export function navToMovieMap(movieId) {
	return (dispatch, getState) => {
		dispatch(typeAsDispatch(NAV_TO_MOVIE_MAP));
		const locBeforeTrans = getState().routing.locationBeforeTransitions;
		if (locBeforeTrans.pathname.indexOf('map/') === -1) {
			return dispatch(push({
				search: 'map/' + movieId
			}));
		} else {
			return Promise.resolve();
		}
	};
}
export function filterMovies(query) {
	return (dispatch, getState) => {
		dispatch(typeAsDispatch(FILTER_MOVIES));
		dispatch(setSearchQuery(query));
		dispatch(uiActions.retain());
		const allMovies = getState().movies.allMovies;
		const visibleMovies = allMovies.filter((movie) => {
			return (
				movie.movie.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
			);
		});
		dispatch(uiActions.release());
		return dispatch(setVisibleMovies(visibleMovies));
	}
}
