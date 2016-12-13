import { connect } from 'react-redux';
import { setShowTrailer, loadMovieById, navToMovieList } from '../ducks/movies';
import { setMapCenter, setMapZoom } from '../ducks/map';
import MovieMap from './MovieMap';

const mapStateToProps = (state) => {
	return {
		movie: state.movies.activeMovie.movie,
		locations: state.movies.activeMovie.locations,
		mapCenter: state.map.mapCenter,
		mapZoom: state.map.mapZoom,
		showTrailer: state.movies.showTrailer
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		onLocationClick: (location, shouldSetZoom = true) => {
			if (shouldSetZoom) {
				dispatch(setMapZoom(15));
			}
			return dispatch(setMapCenter({
				lat: location.lat,
				lng: location.lon || location.lng
			}));
		},
		onOverlayClick: () => {
			return dispatch(setShowTrailer(false));
		},
		fetchMovieById: (movieId) => {
			return dispatch(loadMovieById(movieId));
		},
		navToMovieList: () => {
			return dispatch(navToMovieList());
		}
	};
};

const MovieMapContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(MovieMap);

export default MovieMapContainer;
