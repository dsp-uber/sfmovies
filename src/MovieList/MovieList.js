import React, { PropTypes } from 'react';
import MovieCard, { MoviePropType } from '../MovieCard/MovieCard';
import './movieList.css';

const MovieList = ({movies, onMovieClick}) => (
	<div className="movie-list mdl-grid">
		{movies.map(function(mData) {
			return (
				<div
					key={mData.movie.id}
					className="mdl-cell movie-list-cell-special">
					<MovieCard
						mData={mData}
						onClick={() => onMovieClick(mData)}
					/>
				</div>
			);
		})}
	</div>
);

MovieList.propTypes = {
	movies: PropTypes.arrayOf(MoviePropType).isRequired,
	onMovieClick: PropTypes.func.isRequired
};

export default MovieList;
