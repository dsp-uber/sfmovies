import React, { Component } from 'react';

import MovieCard from '../MovieCard/MovieCard';

import movies from '../../resources/movies.json';

export default class MovieList extends Component {
	render() {
		return (
			<div className="xmdl-grid">
				{movies.map(function(mData) {
					return (
						<div key={mData.movie.id} className="xmdl-cell xmdl-cel--3-col">
							<MovieCard mData={mData} />
						</div>
					);
				})}
			</div>
		);
	}
}
