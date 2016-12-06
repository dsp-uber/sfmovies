import React, { Component } from 'react';

import MovieCard from '../MovieCard/MovieCard';

import movies from '../../resources/movies.json';

import './movieList.css';

export default class MovieList extends Component {
	render() {
		return (
			<div className="movie-list mdl-grid">
				{movies.map(function(mData) {
					return (
						<div key={mData.movie.id} className="mdl-cell movie-list-cell-special">
							<MovieCard mData={mData} />
						</div>
					);
				})}
			</div>
		);
	}
}
