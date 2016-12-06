import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router'

import App from './App';
import MovieListContainer from '../MovieList/MovieListContainer';
import MovieMap from '../MovieMap/MovieMap';

const Root = ({ store }) => (
	<Provider store={store}>
		<Router history={hashHistory}>
			<Route path="/" component={App}>
				<IndexRoute component={MovieListContainer} />
				<Route path="map" component={MovieMap}></Route>
			</Route>
		</Router>
	</Provider>
);

Root.propTypes = {
	store: PropTypes.object.isRequired,
};

export default Root;
