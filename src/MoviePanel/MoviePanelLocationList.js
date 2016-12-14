import React, { PropTypes } from 'react';
import classNames from 'classnames';
import MovieLocationsPropType from '../Movie/MovieLocationsPropType';

import './moviePanelLocationList.css';

const MoviePanelLocationList = ({locations, onLocationClick}) => (
	<div className="movie-panel-locations">
		<h6 className="movie-panel-locations__title mdl-typography--title">
			Filming locations
		</h6>
		<ul className="movie-panel-locations__list mdl-list">
			{locations.map((location, i) => (
				<li
					key={i}
					className={
						classNames(
							'movie-panel-locations__elem mdl-list__item',
							location.funFacts ? 'mdl-list__item--three-line' : null
						)
					}
					onClick={() => onLocationClick(location)}
				>
					<span className="mdl-list__item-primary-content">
						<i className="material-icons mdl-list__item-avatar">place</i>
						<span>{location.origAddress}</span>
						<span className="mdl-list__item-text-body">
							<span>{location.funFacts}</span>
						</span>
					</span>
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
