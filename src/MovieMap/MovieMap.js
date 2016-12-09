import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { MoviePropType } from '../MovieCard/MovieCard';

class MovieMap extends Component {
	/**
	 * @TODO Load the movie if we only have the ID in the url
	 */
	// componentDidMount() {
	// 	console.log('componentWillReceiveProps', this.props);
	// 	// super.componentWillReceiveProps(...arguments);
	// 	if (!this.props.params.id) {
	// 		console.log('no id');
	// 		dispatch(moviesActions.openMovies());
	// 	} else if (!this.props.movie) {
	// 		console.log('no movie');
	// 		dispatch(moviesActions.loadMovieById(this.props.routeParams.id));
	// 	} else {
	// 		console.log('all good');
	// 		this.movie = this.props.movie;
	// 		this.locations = this.props.locations;
	// 	}
	// }
	render() {
		return (
			<div>
				{this.movie}
				{this.locations}
				<Link to="/">list</Link>
			</div>
		);
	}
}
MovieMap.defaultProps = {
	movie: {
		id: '',
		originalTitle: '',
		year: ''
	},
	locations: [
		{
			id: '',
			movieId: '',
			origAddress: ''
		}
	]
};
MovieMap.propTypes = {
	movie: MoviePropType,
	locations: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string.isRequired,
		movieId: PropTypes.string.isRequired,
		origAddress: PropTypes.string.isRequired,
		funFacts: PropTypes.string,
		address: PropTypes.string,
		lat: PropTypes.number,
		lon: PropTypes.number
	})).isRequired
};

export default MovieMap;
