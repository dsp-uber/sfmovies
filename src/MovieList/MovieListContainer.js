import { connect } from 'react-redux';
import {
	fetchMovieFromTMDbAndSetActive,
	filterMovies,
	loadMovieById,
	navToMovieList
} from '../ducks/movies';
import MovieList from './MovieList';

const mapStateToProps = (state) => {
	return {
		movies: state.movies.visibleMovies
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onMovieClick: (movie) => {
			dispatch(fetchMovieFromTMDbAndSetActive(movie));
		},
		onSearch: (query) => {
			dispatch(filterMovies(query));
		},
		fetchMovieById: (movieId) => {
			dispatch(loadMovieById(movieId));
		},
		navToMovieList: () => {
			dispatch(navToMovieList());
		}
	}
};

const MovieListContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(MovieList);

export default MovieListContainer;
