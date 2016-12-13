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

class MovieMap extends Component {
	componentDidMount() {
		if (!this.props.params.id) {
			this.props.navToMovieList();
		} else if (!this.props.movie.id) {
			this.props.fetchMovieById(this.props.routeParams.id).then(() => {
				this.props.onLocationClick(this.getBounds().center, false);
				this._triggerWindowResize();
			});
		} else {
			this.props.onLocationClick(this.getBounds().center, false);
			this._triggerWindowResize();
		}
	}
	mapOptions() {
		return {
			styles: mapStyles
		};
	}
	getBounds() {
		let bounds = {
			nw: {lat: 1000, lng: -1000},
			se: {lat: -1000, lng: 1000}
		};
		this.props.locations.forEach(function(location) {
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
	render() {
		return (
			<main
				className={classNames('movie-map__layout mdl-layout__content', [
					this.props.showTrailer ? 'show-trailer' : ''
				])}
			>
				<div className="back-to-list">
					<Link to="/">
						<div className="mdl-layout__drawer-button">
							<i className="material-icons">arrow_back</i>
						</div>
					</Link>
				</div>
				<div className="movie-map">
					<div className="movie-map__grid">
						<div onClick={this.props.onOverlayClick}>
							<div className="movie-map__left">
								<GoogleMap
									className="movie-map__gmap"
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
