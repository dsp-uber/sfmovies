import React, { PropTypes } from 'react';
import MovieLocationsPropType from '../Movie/MovieLocationsPropType';

import './moviePanelLocationList.css';

const MoviePanelLocationList = ({locations, onLocationClick}) => (
	<div className="movie-panel-locations">
		<h6 className="movie-panel-locations__title mdl-typography--title">
			Filming locations
		</h6>
		<ul className="movie-panel-locations__list">
			{locations.map((location, i) => (
				<li
					key={i}
					className="movie-panel-locations__elem"
					onClick={() => onLocationClick(location)}
				>
					<div className="movie-panel-locations__elem-icon">
						<i className="material-icons mdl-list__item-avatar">place</i>
					</div>
					<div className="movie-panel-locations__elem-text">
						<span className="movie-panel-locations__elem-title">
							{location.origAddress}
						</span>
						<span className="mdl-list__item-text-body">
							<span>{location.funFacts}</span>
						</span>
					</div>
				</li>
			))}
		</ul>
	</div>
);

MoviePanelLocationList.propTypes = {
	locations: MovieLocationsPropType.isRequired,
	onLocationClick: PropTypes.func.isRequired
};

export default MoviePanelLocationList;
