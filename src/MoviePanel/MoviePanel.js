import React, { PropTypes } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import MovieMap from '../MovieMap/MovieMap';

const MoviePanel = ({movie}) => (
	<div>moviepanel</div>
);

MoviePanel.propTypes = {
	movie: PropTypes.shape({
		locations: MovieMap.propTypes.locations,
		mData: Object.assign({}, MovieCard.propTypes.mData, {
			backdropPath: PropTypes.string,
			imdbId: PropTypes.string,
			runtime: PropTypes.number,
			tagline: PropTypes.string
		});
	})
};
