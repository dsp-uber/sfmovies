import { connect } from 'react-redux';
import { setMapZoom, setMapCenter } from '../ducks/map';
import MoviePanelLocationList from './MoviePanelLocationList';

const mapStateToProps = (state) => ({
	locations: state.movies.activeMovie.locations
});

const mapDispatchToProps = (dispatch) => ({
	onLocationClick: (location, shouldSetZoom = true) => {
		if (shouldSetZoom) {
			dispatch(setMapZoom(15));
		}
		return dispatch(setMapCenter({
			lat: location.lat,
			lng: location.lon || location.lng
		}));
	}
});

const MoviePanelLocationListContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(MoviePanelLocationList);

export default MoviePanelLocationListContainer;
