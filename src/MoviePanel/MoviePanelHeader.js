import React, { PropTypes } from 'react';
import MovieGenresContainer from '../Movie/MovieGenresContainer';
import MovieRating from '../Movie/MovieRating';
import MoviePropType from '../Movie/MoviePropType';
import { getAbsImgPath } from '../app/utils';

import './moviePanelHeader.css';

const MoviePanelHeader = ({movie, onTrailerClick}) => (
	<div className="movie-panel-top">
		<div
			className="movie-panel-top__backdrop"
			style={{
				backgroundImage: 'url(' + getAbsImgPath(movie.backdropPath) + ')'
			}}
		></div>
		<div className="movie-panel-top__poster"
			style={{
				backgroundImage:
					'url(' + getAbsImgPath(movie.posterPath) +
				')'
			}}
		></div>
		<header className="movie-panel-header mdl-layout__header">
			<div className="movie-panel-header__row mdl-layout__header-row">
				<span className="movie-panel-header__title mdl-layout__title">
					{movie.title}
					<span className="movie-panel-header__title-year">
						{' (' + movie.year})
					</span>
				</span>
			</div>
			<div className="movie-panel-header__row movie-panel-header__row--sub-row mdl-layout__header-row">
				<div className="movie-panel-header__subtitle">
					<div className="movie-panel-header-genres">
						<MovieGenresContainer movieGenres={movie.genres} />
					</div>
					<div className="movie-panel-header-rating">
						<MovieRating
							voteAverage={movie.voteAverage}
							voteCount={movie.voteCount}
						/>
					</div>
				</div>
			</div>
			{
				movie.youtubeTrailerId && (
					<button
						onClick={(e) => {
							e.stopPropagation();
							return onTrailerClick();
						}}
						className="movie-panel-header__fab mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored"
					>
						<i className="material-icons">movie_creation</i>
					</button>
				)
			}
		</header>
	</div>
);

MoviePanelHeader.propTypes = {
	movie: MoviePropType.isRequired,
	onTrailerClick: PropTypes.func.isRequired
};

export default MoviePanelHeader;
