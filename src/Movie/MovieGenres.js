import React, { PropTypes } from 'react';

const MovieGenres = ({movieGenres, genres}) => (
	<div>
		{movieGenres.map((genre) => (
			genres[genre]
		)).join(', ')}
	</div>
);

MovieGenres.propTypes = {
	movieGenres: PropTypes.arrayOf(PropTypes.number),
	genres: PropTypes.object.isRequired
};

export default MovieGenres;
