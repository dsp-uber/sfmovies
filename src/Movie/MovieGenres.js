import React, { PropTypes } from 'react';

import './movieGenres.css';

const MovieGenres = ({movieGenres, genres}) => {
	const genresString = movieGenres.map((genre) => (
		genres[genre]
	)).join(', ');
	return (
		<div className="movie-genres" title={genresString}>
			{genresString}
		</div>
	)
};

MovieGenres.propTypes = {
	movieGenres: PropTypes.arrayOf(PropTypes.number),
	genres: PropTypes.object.isRequired
};

export default MovieGenres;
