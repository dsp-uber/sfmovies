import React, { PropTypes } from 'react';
import classNames from 'classnames';
import MovieLocationsPropType from '../Movie/MovieLocationsPropType';

const MoviePanelLocationList = ({locations, onLocationClick}) => (
	<div>
		<h6 className="movie-panel__location-list__title mdl-typography--title">Filming locations</h6>
		<ul className="movie-panel__location-list mdl-list">
			{locations.map((location, i) => {
				let extraClasses = [];
				if (location.funFacts) {
					extraClasses.push('mdl-list__item--three-line');
				}
				return (
					<li
						key={i}
						className={classNames('movie-panel__location mdl-list__item', extraClasses)}
						onClick={() => (onLocationClick(location))}
					>
						<span className="mdl-list__item-primary-content">
							<i className="material-icons mdl-list__item-avatar">place</i>
							<span>{location.origAddress}</span>
							<span className="mdl-list__item-text-body">
								<span>{location.funFacts}</span>
							</span>
						</span>
					</li>
				);
			})}
		</ul>
	</div>
);

MoviePanelLocationList.propTypes = {
	locations: MovieLocationsPropType.isRequired,
	onLocationClick: PropTypes.func.isRequired
};

export default MoviePanelLocationList;
