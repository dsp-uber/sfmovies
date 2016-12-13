import MoviePropType from '../Movie/MoviePropType';

const MoviePanel = ({movie, genres}) => (
	<div className="movie-panel__content">
		<div className="movie-card__rating" title={movie.voteAverage + ' / 10'}>
			{getStarRating(movie.voteAverage)}
			<span className="movie-card__rating-text">
				({movie.voteCount})
			</span>
		</div>
		<MovieRating
			voteAverage={mData.movie.voteAverage}
			voteCount={mData.movie.voteCount}
		/>
		<div className="movie-panel__infos">
			<h6 className="mdl-typography--title">Overview</h6>
			<div className="movie-panel__overview">
				{movie.overview}
			</div>

			<h6 className="mdl-typography--title">Genres</h6>
			<div className="movie-panel__genres">
				{movie.genres.map((genre) => {
					return genres[genre];
				}).join(', ')}
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
);

MoviePanel.propTypes = {
	movie: MoviePropType.isRequired,
	genres: PropType.object.isRequired
};

export default MoviePanel;
