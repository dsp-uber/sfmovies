import { connect } from 'react-redux';
import { selectMovieAndShowMap } from '../ducks/movies';
import MovieList from './MovieList';

const mapStateToProps = (state) => {
	return {
		movies: state.movies.movies
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onMovieClick: (movie) => {
			dispatch(selectMovieAndShowMap(movie));
		}
	}
};

const MovieListContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(MovieList);

export default MovieListContainer;
