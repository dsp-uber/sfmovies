import React, { Component } from 'react';
import Link from 'react-router/lib/Link'
import classNames from 'classnames';
import GoogleMap from 'google-map-react';
import MovieMapLocation from './MovieMapLocation';
import MoviePanelContainer from '../MoviePanel/MoviePanelContainer';
import MoviePropType from '../Movie/MoviePropType';
import MovieLocationsPropType from '../Movie/MovieLocationsPropType';
import mapStyles from './mapStyles.json';
import secretKeys from '../../secrets.json';
import './movieMap.css';

// Calculate the bounds of the markers (only works on the NW hemisphere)
export const getBounds = ({locations}) => {
	let bounds = {
		nw: {lat: 1000, lng: -1000},
		se: {lat: -1000, lng: 1000}
	};
	locations.forEach(function(location) {
		if (location.lat < bounds.nw.lat) {
			bounds.nw.lat =  location.lat;
		}
		if (location.lon > bounds.nw.lng) {
			bounds.nw.lng =  location.lon;
		}

		if (location.lat > bounds.se.lat) {
			bounds.se.lat =  location.lat;
		}
		if (location.lon < bounds.se.lng) {
			bounds.se.lng =  location.lon;
		}
	});
	bounds.center = {
		lat: (bounds.nw.lat + bounds.se.lat) / 2,
		lng: (bounds.nw.lng + bounds.se.lng) / 2,
	};
	return bounds;
}

class MovieMap extends Component {
	// The movie data is loaded here if the user navigates straight from a URL
	componentDidMount() {
		if (!this.props.routeParams.id) {
			this.props.navToMovieList();
		} else if (!this.props.movie.id) {
			this.props.fetchMovieById(this.props.routeParams.id).then(() => {
				this.props.setMapCenterAndZoom(this.getBounds().center, false);
			});
		} else {
			this.props.setMapCenterAndZoom(this.getBounds().center, false);
		}
	}
	// The map colors and styles are from here
	mapOptions = () => ({
		styles: mapStyles
	})
	getBounds = () => (getBounds(this.props))
	/**
	 * @TODO The Trailer should be in its own component
	 */
	render() {
		// This loading could have been done better, but it works.

		// isLoading doesn't get updated for some reason when the loading starts
		// in componentWillMount() so I had to check for the movie's id.
		if (this.props.isLoading || !this.props.movie.id) {
			return null;
		}
		return (
			<main
				className={classNames('movie-map-layout mdl-layout__content', [
					this.props.showTrailer ? 'movie-map-layout--show-trailer' : null
				])}
			>
				<Link to="/">
					<div className="mdl-layout__drawer-button">
						<i className="movie-map__back-button material-icons">arrow_back</i>
					</div>
				</Link>
				<div className="movie-map__content">
					<div className="movie-map-maximizer">
						<div onClick={this.props.onOverlayClick}>
							<div className="movie-map-carto">
								<GoogleMap
									className="movie-map-carto__gmap"
									options={this.mapOptions}
									bootstrapURLKeys={{
										key: secretKeys.gmap
									}}
									center={this.props.mapCenter}
									zoom={this.props.mapZoom}
								>
									{this.props.locations.map(function(location, i) {
										return (
											<MovieMapLocation
												key={i}
												lat={location.lat}
												lng={location.lon}
												label={location.address}
											/>
										);
									})}
								</GoogleMap>
							</div>
							<MoviePanelContainer />
						</div>
						<div className="movie-trailer">
							<iframe
								id="ytplayer"
								type="text/html"
								width="800"
								height="450"
								allowFullScreen="allowfullscreen"
								src={
									'https://www.youtube.com/embed/' +
									this.props.movie.youtubeTrailerId +
									'?autoplay=' + (this.props.showTrailer ? '1' : '0') +
									'&controls=2&modestbranding=1&showinfo=0'
								}
								frameBorder="0"
							></iframe>
						</div>
					</div>
				</div>
			</main>

		);
	}
}
MovieMap.defaultProps = {
	movie: {
		id: '',
		originalTitle: '',
		year: '',
		genres: [],
	},
	genres: [],
	locations: [
		{
			id: '',
			movieId: '',
			origAddress: ''
		}
	]
};



MovieMap.propTypes = {
	movie: MoviePropType.isRequired,
	locations: MovieLocationsPropType.isRequired
};

export default MovieMap;
