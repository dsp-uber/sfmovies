import { connect } from 'react-redux';
import MovieCard from './MovieCard';

const mapStateToProps = (state) => ({
	genres: state.movies.genres
});

const MovieCardContainer = connect(
	mapStateToProps
)(MovieCard);

export default MovieCardContainer;
