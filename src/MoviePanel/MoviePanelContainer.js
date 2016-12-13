import { connect } from 'react-redux';
import MoviePanel from './MoviePanel';

const mapStateToProps = (state) => {
	return {
		movie: state.movies.activeMovie.movie,
		genres: state.movies.genres
	};
};

const MoviePanelContainer = connect(
	mapStateToProps
)(MoviePanel);

export default MoviePanelContainer;