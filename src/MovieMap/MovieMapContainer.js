import { connect } from 'react-redux';
import MovieMap from './MovieMap';

const mapStateToProps = (state) => {
	return {
		movie: state.movies.currentMovie.movie,
		locations: state.movies.currentMovie.locations,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
	}
};

const MovieMapContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(MovieMap);

export default MovieMapContainer;
