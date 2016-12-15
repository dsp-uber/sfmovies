import { connect } from 'react-redux';
import { setShowTrailer, loadMovieById, navToMovieList } from '../ducks/movies';
import { setMapCenter, setMapZoom } from '../ducks/map';
import MovieMap from './MovieMap';

const mapStateToProps = (state) => ({
	isLoading: state.ui.isLoading,
	movie: state.movies.activeMovie.movie,
	locations: state.movies.activeMovie.locations,
	mapCenter: state.map.mapCenter,
	mapZoom: state.map.mapZoom,
	showTrailer: state.movies.showTrailer
});

const mapDispatchToProps = (dispatch) => ({
	setMapCenterAndZoom: (location, shouldSetZoom = true) => {
		if (shouldSetZoom) {
			dispatch(setMapZoom(15));
		}
		return dispatch(setMapCenter({
			lat: location.lat,
			lng: location.lon || location.lng
		}));
	},
	onOverlayClick: () => (
		dispatch(setShowTrailer(false))
	),
	fetchMovieById: (movieId) => (
		dispatch(loadMovieById(movieId))
	),
	navToMovieList: () => (
		dispatch(navToMovieList())
	)
});

const MovieMapContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(MovieMap);

export default MovieMapContainer;
