import React, { Component } from 'react';
import genres from '../../resources/genres.json';

import './movieCard.css';

export default class MovieCard extends Component {
	ratingStars(rating) {
		const fiveStarRating = rating.toFixed() / 2;
		let ratingIcons = [];
		for (let i = 0; i < fiveStarRating - 1; ++i) {
			ratingIcons.push(<i key={i} className="material-icons">star</i>);
		}
		if (fiveStarRating % 1 !== 0) {
			ratingIcons.push(<i key={ratingIcons.length} className="material-icons">star_half</i>);
		}
		if (ratingIcons.length < 5) {
			for (let i = ratingIcons.length; i < 5; i++) {
				ratingIcons.push(<i key={i} className="material-icons">star_border</i>);
			}
		}
		return ratingIcons;
	}
	render() {
		return (
			<div className="movie-card mdl-card mdl-shadow--2dp">
				<div className="movie-card__content">
					<div className="movie-card__title">
						<h2
							className="movie-card__title-text"
							title={this.props.mData.movie.originalTitle}
						>
							{this.props.mData.movie.originalTitle}
						</h2>
						<div className="movie-card__subtitle-text">
							{this.props.mData.movie.genres.map(function(genre) {
								return genres[genre];
							}).join(', ')}
						</div>
					</div>
					<div className="movie-card__rating" title={this.props.mData.movie.voteAverage + ' / 10'}>
						{this.ratingStars(this.props.mData.movie.voteAverage)}
						<span className="movie-card__rating-text">
							({this.props.mData.movie.voteCount})
						</span>
					</div>
					<div className="mdl-card__actions mdl-card--border">
						<a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
							View on map
						</a>
					</div>
				</div>
				<div className="movie-card__media">
					<object data={'https://image.tmdb.org/t/p/w780/' + this.props.mData.movie.posterPath} type="image/jpeg">
						<img src="https://www.themoviedb.org/assets/1c4aa0e7695a4eebe9a4d2c34a93bf34/images/no-poster-w600_and_h900_bestv2-v2.png" alt="Movie poster"/>
					</object>
				</div>
			</div>
		);
	}
}
