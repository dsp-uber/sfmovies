import React, { PropTypes } from 'react';
import './movieCard.css';

// @TODO this should go into the container
import genres from '../../resources/genres.json';

const getStarRating = function(rating) {
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
};

const MovieCard = ({mData, onClick}) => (
	<div
		onClick={onClick}
		className="movie-card mdl-card mdl-shadow--2dp"
	>
		<div
			className="movie-card__media mdl-card__media"
			style={{
				backgroundImage:
					'url(https://image.tmdb.org/t/p/w780/' + mData.movie.posterPath +
				')'
			}}
		>
		</div>
		<div className="movie-card__nomedia"></div>
		<div className="movie-card__content">
			<div className="movie-card__title">
				<h2
					className="movie-card__title-text"
					title={mData.movie.originalTitle}
				>
					{mData.movie.originalTitle}
				</h2>
				<div className="movie-card__subtitle-text">
					{mData.movie.genres.map(function(genre) {
						return genres[genre];
					}).join(', ')}
				</div>
			</div>
			<div
				className="movie-card__rating"
				title={mData.movie.voteAverage + ' / 10'}
			>
				{getStarRating(mData.movie.voteAverage)}
				<span className="movie-card__rating-text">
					({mData.movie.voteCount})
				</span>
			</div>
			{/*
			<div className="movie-card__actions mdl-card__actions mdl-card--border">
				<a className="movie-card__button mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
					View on map
				</a>
			</div>
			*/}
		</div>
	</div>
);

export const MoviePropType = PropTypes.shape({
	id: PropTypes.string.isRequired,
	originalTitle: PropTypes.string.isRequired,
	year: PropTypes.string.isRequired, //should be number
	tmdbId: PropTypes.string,
	title: PropTypes.string,
	overview: PropTypes.string,
	language: PropTypes.string,
	genres: PropTypes.arrayOf(PropTypes.number),
	posterPath: PropTypes.string,
	popularity: PropTypes.number,
	voteAverage: PropTypes.number,
	voteCount: PropTypes.number
});

MovieCard.propTypes = {
	mData: PropTypes.shape({
		movie: MoviePropType.isRequired
	}).isRequired,
	onClick: PropTypes.func.isRequired
};

export default MovieCard;
