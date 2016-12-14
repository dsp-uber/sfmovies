import { connect } from 'react-redux';
import { fetchGenres, fetchAllMovies } from '../ducks/movies';
import App from './App';

const mapStateToProps = (state) => ({
	isLoading: state.ui.isLoading
});

const mapDispatchToProps = (dispatch) => ({
	onLoad: () => {
		dispatch(fetchGenres());
		return dispatch(fetchAllMovies());
	}
});

const AppContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(App);

export default AppContainer;
