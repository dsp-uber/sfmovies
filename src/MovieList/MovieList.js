import React, { PropTypes } from 'react';
import MovieCard, { MoviePropType } from '../MovieCard/MovieCard';
import './movieList.css';

const MovieList = ({movies, onMovieClick, onSearch}) => (
		<div className="mdl-layout mdl-layout--fixed-header">
			<header className="mdl-layout__header is-casting-shadow">
				<div className="mdl-layout__header-row">
					<span className="mdl-layout-title">SFMovies</span>
					<div className="mdl-layout-spacer"></div>
					<div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable mdl-textfield--floating-label mdl-textfield--align-right">
						<label
							className="mdl-button mdl-js-button mdl-button--icon"
							htmlFor="movie-list-search-input"
						>
							<i className="material-icons">search</i>
						</label>
						<div className="mdl-textfield__expandable-holder">
							<input
								onChange={(e) => (onSearch(e.target.value))}
								className="mdl-textfield__input"
								type="text"
								name="sample"
								id="movie-list-search-input"
							/>
						</div>
					</div>
				</div>
			</header>
			<main className="mdl-layout__content">
				<div className="movie-list mdl-grid">
					{movies.map((mData) => (
						<div
							key={mData.movie.id}
							className="movie-list__cell mdl-cell">
							<MovieCard
								mData={mData}
								onClick={() => onMovieClick(mData)}
							/>
						</div>
					))}
				</div>
			</main>
		</div>
);

MovieList.propTypes = {
	movies: PropTypes.arrayOf(
		PropTypes.shape({
			movie: MoviePropType
		})
	).isRequired,
	onMovieClick: PropTypes.func.isRequired
};

export default MovieList;
