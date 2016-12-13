import { PropTypes } from 'react';

const MovieLocationsPropType = PropTypes.arrayOf(PropTypes.shape({
	origAddress: PropTypes.string.isRequired,
	funFacts: PropTypes.string,
	address: PropTypes.string,
	lat: PropTypes.number,
	lon: PropTypes.number
}));

export default MovieLocationsPropType;
