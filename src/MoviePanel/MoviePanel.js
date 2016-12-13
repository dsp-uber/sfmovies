import React, { PropTypes } from 'react';
import NumberFormat from 'react-number-format';
import MoviePanelHeaderContainer from './MoviePanelHeaderContainer';
import MoviePanelLocationListContainer from './MoviePanelLocationListContainer';
import MovieGenresContainer from '../Movie/MovieGenresContainer';
import MovieRating from '../Movie/MovieRating';
import MoviePropType from '../Movie/MoviePropType';

const MoviePanel = ({movie, genres}) => (
	<div className="movie-map__right mdl-shadow--2dp">
		<MoviePanelHeaderContainer />

		<div className="movie-panel__content">
			<MovieRating
				voteAverage={movie.voteAverage}
				voteCount={movie.voteCount}
			/>
			<div className="movie-panel__infos">
				<h6 className="mdl-typography--title">Overview</h6>
				<div className="movie-panel__overview">
					{movie.overview}
				</div>

				<h6 className="mdl-typography--title">Genres</h6>
				<div className="movie-panel__genres">
					<MovieGenresContainer movieGenres={movie.genres} />
				</div>

				<h6 className="mdl-typography--title">Facts</h6>
				<div className="movie-panel__runtime">
					Runtime: {movie.runtime} minutes
				</div>
				<div className="movie-panel__money">
					<div>Budget: <NumberFormat value={movie.budget} displayType={'text'} thousandSeparator={true} prefix={'$'} /></div>
					<div>Revenue: <NumberFormat value={movie.revenue} displayType={'text'} thousandSeparator={true} prefix={'$'} /></div>
				</div>
			</div>

			<MoviePanelLocationListContainer />
		</div>
	</div>
);

MoviePanel.propTypes = {
	movie: MoviePropType.isRequired,
	genres: PropTypes.object.isRequired
};

export default MoviePanel;
