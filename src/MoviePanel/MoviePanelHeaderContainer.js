import { connect } from 'react-redux';
import { setShowTrailer } from '../ducks/movies';
import MoviePanelHeader from './MoviePanelHeader';

const mapStateToProps = (state) => ({
	movie: state.movies.activeMovie.movie,
	genres: state.movies.genres
});

const mapDispatchToProps = (dispatch) => ({
	onTrailerClick: () => (
		dispatch(setShowTrailer(true))
	)
});

const MoviePanelHeaderContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(MoviePanelHeader);

export default MoviePanelHeaderContainer;
