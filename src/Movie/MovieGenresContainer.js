import { connect } from 'react-redux';
import MovieGenres from './MovieGenres';

const mapStateToProps = (state) => {
	return {
		genres: state.movies.genres
	};
};

const MovieGenresContainer = connect(
	mapStateToProps
)(MovieGenres);

export default MovieGenresContainer;
