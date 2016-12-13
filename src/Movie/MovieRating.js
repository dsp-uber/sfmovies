import React, { PropTypes } from 'react';

const getStarRating = function(rating) {
	const fiveStarRating = (rating || 0).toFixed() / 2;
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

const MovieRating = ({voteAverage, voteCount}) => {
	return (
		<div className="movie-card__rating" title={(voteAverage || '0') + ' / 10'}>
			{getStarRating(voteAverage)}
			<span className="movie-card__rating-text">
				({voteCount || '0'})
			</span>
		</div>
	);

}
MovieRating.propTypes = {
	voteAverage: PropTypes.number,
	voteCount: PropTypes.number
};

export default MovieRating;
