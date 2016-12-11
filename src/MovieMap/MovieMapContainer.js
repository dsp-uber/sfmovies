import { connect } from 'react-redux';
import {
	setMapCenter,
	setMapZoom,
	setShowTrailer,
	loadMovieById,
	navToMovieList
} from '../ducks/movies';
import MovieMap from './MovieMap';

const mapStateToProps = (state) => {
	return {
		movie: state.movies.activeMovie.movie,
		locations: state.movies.activeMovie.locations,
		genres: state.movies.genres,
		mapCenter: state.movies.mapCenter,
		mapZoom: state.movies.mapZoom,
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
		onTrailerClick: () => {
			return dispatch(setShowTrailer(true));
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
