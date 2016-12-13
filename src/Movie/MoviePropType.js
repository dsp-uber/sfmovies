import { PropTypes } from 'react';

const MoviePropType = PropTypes.shape({
	id: PropTypes.string.isRequired,
	year: PropTypes.string.isRequired,
	tmdbId: PropTypes.number,
	title: PropTypes.string,
	overview: PropTypes.string,
	language: PropTypes.string,
	genres: PropTypes.arrayOf(PropTypes.number),
	posterPath: PropTypes.string,
	popularity: PropTypes.number,
	voteAverage: PropTypes.number,
	voteCount: PropTypes.number
});

export default MoviePropType;
