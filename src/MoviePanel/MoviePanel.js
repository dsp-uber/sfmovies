import React from 'react';
import NumberFormat from 'react-number-format';
import MoviePanelHeaderContainer from './MoviePanelHeaderContainer';
import MoviePanelLocationListContainer from './MoviePanelLocationListContainer';
import MoviePropType from '../Movie/MoviePropType';

import './moviePanel.css';

const MoviePanel = ({movie}) => (
	<div className="movie-panel mdl-shadow--2dp">
		<MoviePanelHeaderContainer />

		<div className="movie-panel__content">
			<div className="movie-panel-infos">
				<h6 className="mdl-typography--title">Overview</h6>
				<div className="movie-panel__overview">
					{movie.overview}
				</div>

				<h6 className="mdl-typography--title">Facts</h6>
				<table className="movie-panel-table">
					<tbody>
						<tr>
							<td className="movie-panel-table__key">Runtime</td>
							<td className="movie-panel-table__val">{movie.runtime} minutes</td>
						</tr>
						<tr>
							<td className="movie-panel-table__key">Budget</td>
							<td className="movie-panel-table__val">
								<NumberFormat
									value={movie.budget}
									displayType={'text'}
									thousandSeparator={true}
									prefix={'$'}
								/>
							</td>
						</tr>
						<tr>
							<td className="movie-panel-table__key">Revenue</td>
							<td className="movie-panel-table__val">
								<NumberFormat
									value={movie.revenue}
									displayType={'text'}
									thousandSeparator={true}
									prefix={'$'}
								/>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<MoviePanelLocationListContainer />
		</div>
	</div>
);

MoviePanel.propTypes = {
	movie: MoviePropType.isRequired
};

export default MoviePanel;
