import { connect } from 'react-redux';
import MoviePanel from './MoviePanel';

const mapStateToProps = (state) => ({
	movie: state.movies.activeMovie.movie
});

const MoviePanelContainer = connect(
	mapStateToProps
)(MoviePanel);

export default MoviePanelContainer;
