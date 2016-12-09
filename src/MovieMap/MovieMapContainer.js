import { connect } from 'react-redux';
import MovieMap from './MovieMap';

const mapStateToProps = (state) => {
	return {
		movie: state.movies.activeMovie.movie,
		locations: state.movies.activeMovie.locations,
	};
};

const MovieMapContainer = connect(
	mapStateToProps
)(MovieMap);

export default MovieMapContainer;
