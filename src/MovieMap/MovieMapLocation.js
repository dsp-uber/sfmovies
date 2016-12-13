import React, { PropTypes } from 'react';

const MovieLocation = ({label}) => {
	return (
		<div className="movie-map__loc" title={label}>
			<i className="movie-map__loc__icon-bg material-icons">place</i>
			<i className="movie-map__loc__icon-fg material-icons">videocam</i>
		</div>
	);
};

MovieLocation.propTypes = {
	label: PropTypes.string.isRequired
};

export default MovieLocation;
