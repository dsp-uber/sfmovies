import request from 'request';
import { history } from '../app/store';
import * as uiActions from './ui';
import MovieDBClient from 'moviedb';
import secretKeys from '../../secrets.json';
const MovieDB = MovieDBClient(secretKeys.tmdb);

// Actions
const SHOW_MOVIE = 'sfmovies/movies/SHOW_MOVIE';
const SHOW_MOVIES = 'sfmovies/movies/SHOW_MOVIES';
const STORE_GENRES = 'sfmovies/movies/STORE_GENRES';

const MOVIES_INIT = {
	movies: [],
	genres: {},
	activeMovie: {}
};

// Reducer
export default function reducer(state = MOVIES_INIT, action = {}) {
	switch (action.type) {
		case SHOW_MOVIE:
			return Object.assign({}, state, {
				activeMovie: action.movie
			});
		case SHOW_MOVIES:
			return Object.assign({}, state, {
				movies: action.movies
			});
		case STORE_GENRES:
			return Object.assign({}, state, {
				genres: action.genres
			});
		default:
			return state;
	}
}

// Action Creators

export function showMovie(movie) {
	return {
		type: SHOW_MOVIE,
		movie
	};
}
export function showMovies(movies) {
	return {
		type: SHOW_MOVIES,
		movies
	};
}
export function storeGenres(genres) {
	return {
		type: STORE_GENRES,
		genres
	};
}
export function openMovies() {
	return (dispatch, getState) => {
		history.push({
			search: '/'
		});
	};
}
export function loadMovies() {
	return (dispatch, getState) => {
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
						console.error('Failure while loading movies.', e);
					}
					dispatch(uiActions.setLoading(false));
					dispatch(showMovies(movies))
				}
			}
		);
	};
}
export function loadGenres() {
	return (dispatch, getState) => {
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
						console.error('Failure while loading genres.', e);
					}
					dispatch(uiActions.setLoading(false));
					dispatch(storeGenres(genres))
				}
			}
		);
	};
}
export function loadMovie(movie) {
	return (dispatch, getState) => {
		dispatch(uiActions.setLoading(true));
		dispatch(showMovie(Object.assign({}, movie)));
		if (movie.tmdbId) {
			MovieDB.movieInfo({id: movie.tmdbId}, (err, res) => {
				if (res) {
					// merge movie objects in redux
					dispatch(showMovie(Object.assign({},
						getState().currentMovie,
						res
					)));
				}
			});
		}
	};
}
export function loadMovieById(id) {
	return (dispatch, getState) => {
		dispatch(uiActions.setLoading(true));
		const movies = Object.assign({},
			getState().movies
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
			dispatch(loadMovie(activeMovie));
		} else {
			dispatch(openMovies());
		}
	};
}
export function openMovie(movie) {
	return (dispatch, getState) => {
		history.push({
			search: 'map/' + movie.movie.id
		});
	};
}
