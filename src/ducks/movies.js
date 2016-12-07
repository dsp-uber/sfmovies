// import MovieDBClient from 'moviedb';
import { getParameterByName, generateUrl } from '../app/utils';
import { history } from '../app/store';

import movies from '../../resources/movies.json';

// import secretKeys from '../secrets.json';

// const MovieDB = MovieDBClient(secretKeys.tmdb);

// Actions
const SELECT_MOVIE = 'sfmovies/movies/SELECT_MOVIE';
const SEARCH_MOVIE = 'sfmovies/movies/SEARCH_MOVIE';
// const LOAD_MOVIES = 'sfmovies/movies/LOAD_MOVIES';

const MOVIES_INIT = {
	movies: movies,
	count: 0,
	query: getParameterByName('query'),
	currentMovie: {}
};

// Reducer
export default function reducer(state = MOVIES_INIT, action = {}) {
	switch (action.type) {
		case SELECT_MOVIE:
			return Object.assign({}, state, {
				currentMovie: action.movie
			});
		case SEARCH_MOVIE:
			return Object.assign({}, state, {
				query: action.query
			});
		// case LOAD_MOVIES:
		// 	return Object.assign({}, state, {
		// 		movies: action.movies
		// 	});
		default:
			return state;
	}
}

// Action Creators

export function selectMovie(movie) {
	return {
		type: SELECT_MOVIE,
		movie
	};
}
export function searchMovie(query) {
	return {
		type: SEARCH_MOVIE,
		query
	};
}
export function changeSearchAndLoadMovies(query) {
	return (dispatch, getState) => {
		dispatch(searchMovie(query));
		// history.push({
		// 	query: generateUrl(getState().movies)
		// });
		// Querying the API would go here
	};
}
export function selectMovieAndShowMap(movie) {
	return (dispatch, getState) => {
		dispatch(selectMovie(movie));
		history.push({
			search: 'map'
		});
	};
}
// export function loadMovie(tmdbId) {
// 	return (dispatch, getState) => {
// 		const currentMovie = getState().movie;
// 		MovieDB.movieInfo({id: tmdbId}, (err, res) => {
// 			if (res) {
// 				// merge movie objects in redux
// 				dispatch(selectMovie())
// 			}
// 		});
// 	};
// }
