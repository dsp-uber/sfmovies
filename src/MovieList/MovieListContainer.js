import { connect } from 'react-redux';
import { openMovieMap } from '../app/duck';
import MovieList from './MovieList';

const mapStateToProps = (state) => {
	return {
		movies: state.movies
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onMovieClick: (id) => {
			dispatch(openMovieMap(id));
		}
	}
};

const MovieListContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(MovieList);

export default MovieListContainer;
