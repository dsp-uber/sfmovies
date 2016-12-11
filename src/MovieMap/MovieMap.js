import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import NumberFormat from 'react-number-format';
import classNames from 'classnames';
import { MoviePropType, getStarRating } from '../MovieCard/MovieCard';
import GoogleMap from 'google-map-react';
import mapStyles from './mapStyles.json';
import secretKeys from '../../secrets.json';

import './movieMap.css';

const MovieLocation = (props) => {
	return (
		<div className="movie-map__loc" title={props.text}>
			<i className="movie-map__loc__icon-bg material-icons">place</i>
			<i className="movie-map__loc__icon-fg material-icons">videocam</i>
		</div>
	);
};

class MovieMap extends Component {
	constructor(props) {
		super(props);
		this.Map = {};
		this.Maps = {
			event: {
				trigger: () => {
					console.log('trigger', {...arguments});
				}
			}
		};
	}

	_triggerWindowResize() {
		var ev = document.createEvent('Event');
		ev.initEvent('resize', true, true);
		window.dispatchEvent(ev);
	}

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
									onGoogleApiLoaded={({map, maps}) => {
										this._triggerWindowResize();
										setTimeout(() => {
											this._triggerWindowResize();
											maps.event.trigger(map, 'resize');
											this.props.onLocationClick(this.getBounds().center, false);
										}, 100);
										return true;
									}}
									yesIWantToUseGoogleMapApiInternals
								>
									{this.props.locations.map(function(location, i) {
										return (
											<MovieLocation
												key={i}
												lat={location.lat}
												lng={location.lon}
												text={location.address}
											/>
										);
									})}
								</GoogleMap>
							</div>

							<div className="movie-map__right mdl-shadow--2dp">
								<div className="movie-panel__top">
									<div
										className="movie-panel__backdrop"
										style={{
											backgroundImage:
												'url(https://image.tmdb.org/t/p/w780/' + this.props.movie.backdropPath +
											')'
										}}
									></div>
									<div className="movie-panel__poster"
										style={{
											backgroundImage:
												'url(https://image.tmdb.org/t/p/w780/' + this.props.movie.posterPath +
											')'
										}}
									></div>
									<header className="movie-panel__header mdl-layout__header">
										<div className="mdl-layout__header-row">
											<span className="mdl-layout__title">
												{this.props.movie.title}
												<span className="movie-panel__title-year">
													{' (' + this.props.movie.year})
												</span>
											</span>
										</div>
										{(() => {
											if (this.props.movie.youtubeTrailerId) {
												return (
													<button
														onClick={(e) => {
															e.stopPropagation();
															return this.props.onTrailerClick();
														}}
														className="movie-panel__header__fab mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored"
													>
														<i className="material-icons">movie_creation</i>
													</button>
												);
											}
										})()}
									</header>
								</div>
								<div className="movie-panel__content">
									<div
										className="movie-card__rating"
										title={this.props.movie.voteAverage + ' / 10'}
									>
										{getStarRating(this.props.movie.voteAverage)}
										<span className="movie-card__rating-text">
											({this.props.movie.voteCount})
										</span>
									</div>
									<div className="movie-panel__infos">
										<h6 className="mdl-typography--title">Overview</h6>
										<div className="movie-panel__overview">
											{this.props.movie.overview}
										</div>

										<h6 className="mdl-typography--title">Genres</h6>
										<div className="movie-panel__genres">
											{this.props.movie.genres.map((genre) => {
												return this.props.genres[genre];
											}).join(', ')}
										</div>

										<h6 className="mdl-typography--title">Facts</h6>
										<div className="movie-panel__runtime">
											Runtime: {this.props.movie.runtime} minutes
										</div>
										<div className="movie-panel__money">
											<div>Budget: <NumberFormat value={this.props.movie.budget} displayType={'text'} thousandSeparator={true} prefix={'$'} /></div>
											<div>Revenue: <NumberFormat value={this.props.movie.revenue} displayType={'text'} thousandSeparator={true} prefix={'$'} /></div>
										</div>
									</div>

									<h6 className="movie-panel__location-list__title mdl-typography--title">Filming locations</h6>
									<ul className="movie-panel__location-list mdl-list">
										{this.props.locations.map((location, i) => {
											let extraClasses = [];
											if (location.funFacts) {
												extraClasses.push('mdl-list__item--three-line');
											}
											return (
												<li
													key={i}
													className={classNames('movie-panel__location mdl-list__item', extraClasses)}
													onClick={() => (this.props.onLocationClick(location))}
												>
													<span className="mdl-list__item-primary-content">
														<i className="material-icons mdl-list__item-avatar">place</i>
														<span>{location.origAddress}</span>
														<span className="mdl-list__item-text-body">
															<span>{location.funFacts}</span>
														</span>
													</span>
												</li>
											);
										})}
									</ul>
								</div>
							</div>
						</div>
						<div className="movie-trailer">
							<iframe
								id="ytplayer"
								type="text/html"
								width="800"
								height="450"
								allowFullScreen="allowfullscreen"
								src={'https://www.youtube.com/embed/' + this.props.movie.youtubeTrailerId + '?autoplay=' + (this.props.showTrailer ? '1' : '0') + '&controls=2&modestbranding=1&showinfo=0'}
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
	movie: MoviePropType,
	locations: PropTypes.arrayOf(PropTypes.shape({
		// id: PropTypes.string.isRequired,
		// movieId: PropTypes.string.isRequired,
		origAddress: PropTypes.string.isRequired,
		funFacts: PropTypes.string,
		address: PropTypes.string,
		lat: PropTypes.number,
		lon: PropTypes.number
	})).isRequired
};

export default MovieMap;
