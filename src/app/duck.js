// https://github.com/erikras/ducks-modular-redux
import movies from '../../resources/movies.json';


const initialState = {
	isFirstRun: true,

	currentPage: 'list',
	currentMovie: null,
	movieMap: null,

	searchQuery: '',

	// @TODO `moviesById: { id -> mData }`
	// @TODO `movies: array<id>`
	// @TODO Do I actually need the stuff above?
	movies: movies
};

// Actions
// const SET_FIRST_RUN = 'sfmovies/SET_FIRST_RUN';

const SET_CURRENT_PAGE = 'sfmovies/SET_CURRENT_PAGE';
const SET_CURRENT_MOVIE = 'sfmovies/SET_CURRENT_MOVIE';
// const SET_MOVIE_MAP = 'sfmovies/SET_MOVIE_MAP';

// const SET_SEARCH_QUERY = 'sfmovies/SET_SEARCH_QUERY';

// const ADD_MOVIE = 'sfmovies/ADD_MOVIE';
const OPEN_MOVIE_MAP = 'sfmovies/OPEN_MOVIE_MAP';


// Reducer
export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
		case OPEN_MOVIE_MAP:
			return Object.assign({}, state, {
				currentMovie: action.mData,
				currentPage: 'map'
			});

		case SET_CURRENT_MOVIE:
			return Object.assign({}, state, {
				currentMovie: action.mData
			});

		case SET_CURRENT_PAGE:
			return Object.assign({}, state, {
				currentPage: action.pageName
			});

		default:
			return state;
	}
}

// Action Creators
export const openMovieMap = (id) => {
	return {
		type: OPEN_MOVIE_MAP,
		id
	};
};

export const setCurrentPage = (pageName) => {
	return {
		type: SET_CURRENT_PAGE,
		pageName
	};
};

export const setCurrentMovie = (mData) => {
	return {
		type: SET_CURRENT_MOVIE,
		mData
	};
};
