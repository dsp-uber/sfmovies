import React, { PropTypes } from 'react';
import MoviePropType from '../Movie/MoviePropType';
import { getAbsImgPath } from '../app/utils';

const MoviePanelHeader = ({movie, onTrailerClick}) => (
	<div className="movie-panel__top">
		<div
			className="movie-panel__backdrop"
			style={{
				backgroundImage: 'url(' + getAbsImgPath(movie.backdropPath) + ')'
			}}
		></div>
		<div className="movie-panel__poster"
			style={{
				backgroundImage:
					'url(' + getAbsImgPath(movie.posterPath) +
				')'
			}}
		></div>
		<header className="movie-panel__header mdl-layout__header">
			<div className="mdl-layout__header-row">
				<span className="mdl-layout__title">
					{movie.title}
					<span className="movie-panel__title-year">
						{' (' + movie.year})
					</span>
				</span>
			</div>
			{(() => {
				if (movie.youtubeTrailerId) {
					return (
						<button
							onClick={(e) => {
								e.stopPropagation();
								return onTrailerClick();
							}}
							className="movie-panel__header__fab mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored"
						>
							<i className="material-icons">movie_creation</i>
						</button>
					);
				}
			})()}
		</header>
	</div>
);

MoviePanelHeader.propTypes = {
	movie: MoviePropType.isRequired,
	onTrailerClick: PropTypes.func.isRequired
};

export default MoviePanelHeader;
