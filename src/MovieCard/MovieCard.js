import React, { PropTypes } from 'react';
import { getAbsImgPath } from '../app/utils';
import MovieRating from '../Movie/MovieRating';
import MovieGenresContainer from '../Movie/MovieGenresContainer';
import MoviePropType from '../Movie/MoviePropType';
import './movieCard.css';

const MovieCard = ({mData, onClick, genres}) => (
	<div onClick={onClick} className="movie-card mdl-card mdl-shadow--2dp">
		<div
			className="movie-card__poster mdl-card__media"
			style={{
				backgroundImage:
					`url(${getAbsImgPath(mData.movie.posterPath)}),
					url(${process.env.PUBLIC_URL}/static/img/no-poster.png)`
			}}
		>
		</div>
		<div className="movie-card-content">
			<div className="movie-card-content-title">
				<h2
					className="movie-card-content-title__text"
					title={mData.movie.title}
				>
					{mData.movie.title}
				</h2>
				<div className="movie-card-content-title__subtitle">
					<MovieGenresContainer movieGenres={mData.movie.genres} />
				</div>
			</div>

			<MovieRating
				voteAverage={mData.movie.voteAverage}
				voteCount={mData.movie.voteCount}
			/>
		</div>
	</div>
);

MovieCard.propTypes = {
	mData: PropTypes.shape({
		movie: MoviePropType.isRequired
	}).isRequired,
	onClick: PropTypes.func.isRequired
};

export default MovieCard;
