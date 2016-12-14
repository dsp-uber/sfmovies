import React, { PropTypes } from 'react';
import './movieMapLocation.css';

const MovieLocation = ({label}) => (
	<div className="movie-map-mark" title={label}>
		<i
			className="movie-map-mark__icon movie-map-mark__icon--bg material-icons"
		>
			place
		</i>
		<i
			className="movie-map-mark__icon movie-map-mark__icon--fg material-icons"
		>
			videocam
		</i>
	</div>
);

MovieLocation.propTypes = {
	label: PropTypes.string.isRequired
};

export default MovieLocation;
