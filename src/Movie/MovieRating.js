import React, { PropTypes } from 'react';
import './movieRating.css';

const getStarRating = (rating) => {
	const fiveStarRating = (rating || 0).toFixed() / 2;
	let ratingIcons = [];
	for (let i = 0; i < fiveStarRating - 1; ++i) {
		ratingIcons.push(
			<i key={i} className="movie-rating__star material-icons">
				star
			</i>
		);
	}
	if (fiveStarRating % 1 !== 0) {
		ratingIcons.push(
			<i key={ratingIcons.length} className="movie-rating__star material-icons">
				star_half
			</i>
		);
	}
	if (ratingIcons.length < 5) {
		for (let i = ratingIcons.length; i < 5; i++) {
			ratingIcons.push(
				<i key={i} className="movie-rating__star material-icons">star_border</i>
			);
		}
	}
	return ratingIcons;
};

const MovieRating = ({voteAverage, voteCount}) => (
	<div className="movie-rating" title={(voteAverage || '0') + ' / 10'}>
		{getStarRating(voteAverage)}
		<span className="movie-rating__text">
			({voteCount || '0'})
		</span>
	</div>
);

MovieRating.defaultProps = {
	voteAverage: 0,
	voteCount: 0
};

MovieRating.propTypes = {
	voteAverage: PropTypes.number,
	voteCount: PropTypes.number
};

export default MovieRating;
