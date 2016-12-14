import { connect } from 'react-redux';
import { fetchMovieFromTMDbAndSetActive, filterMovies } from '../ducks/movies';
import MovieList from './MovieList';

const mapStateToProps = (state) => ({
	movies: state.movies.visibleMovies
});

const mapDispatchToProps = (dispatch) => ({
	onMovieClick: (movie) => (
		dispatch(fetchMovieFromTMDbAndSetActive(movie))
	),
	onSearch: (query) => (
		dispatch(filterMovies(query))
	)
});

const MovieListContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(MovieList);

export default MovieListContainer;
