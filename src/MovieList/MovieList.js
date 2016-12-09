import React, { PropTypes } from 'react';
import { MoviePropType } from '../MovieCard/MovieCard';
import MovieCardContainer from '../MovieCard/MovieCardContainer';
import './movieList.css';

const MovieList = ({movies, onMovieClick}) => (
	<div className="movie-list mdl-grid">
		{movies.map(function(mData) {
			return (
				<div
					key={mData.movie.id}
					className="mdl-cell movie-list-cell-special">
					<MovieCardContainer
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
