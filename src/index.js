import React from 'react';
import ReactDOM from 'react-dom';
import IndexRoute from 'react-router/lib/IndexRoute';
import Route from 'react-router/lib/Route';
import Router from 'react-router/lib/Router';
import { Provider } from 'react-redux';

import store from './app/store';
import { history } from './app/store';

import AppContainer from './app/AppContainer';
import MovieListContainer from './MovieList/MovieListContainer';
import MovieMapContainer from './MovieMap/MovieMapContainer';
import About from './app/About.js';

import './index.css';

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<Route path="/" component={AppContainer}>
				<IndexRoute component={MovieListContainer} />

				<Route path="/map/:id" component={MovieMapContainer} />

				<Route path="/about" component={About}/>

				<Route path="*" component={MovieListContainer} />
			</Route>
		</Router>
	</Provider>,
	document.getElementById('root')
);
