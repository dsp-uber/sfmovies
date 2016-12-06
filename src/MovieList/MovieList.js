import React, { PropTypes } from 'react';
import MovieCard from '../MovieCard/MovieCard';
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
						onClick={() => onMovieClick(mData.movie.id)}
					/>
				</div>
			);
		})}
	</div>
);

MovieList.propTypes = {
	movies: PropTypes.arrayOf(PropTypes.shape({
		movie: MovieCard.propTypes.mData
	})).isRequired,
	onMovieClick: PropTypes.func.isRequired
};

export default MovieList;
