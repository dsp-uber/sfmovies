import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const MovieMap = ({locations}) => (
	<div>
		movie map
		<Link to="/">list</Link>
	</div>
);

MovieMap.propTypes = {
	locations: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string.isRequired,
		movieId: PropTypes.string.isRequired,
		origAddress: PropTypes.string.isRequired,
		funFacts: PropTypes.string,
		address: PropTypes.string,
		lat: PropTypes.number,
		lon: PropTypes.number
	})).isRequired
};

export default MovieMap;
