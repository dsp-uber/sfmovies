import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';

import store from './app/store';
import { history } from './app/store';

import App from './app/App';
import MovieListContainer from './MovieList/MovieListContainer';
import MovieMapContainer from './MovieMap/MovieMapContainer';
import About from './app/About.js';

ReactDOM.render(
	<Provider store={store}>
		<Router history={history}>
			<Route path="/" component={App}>
				<IndexRoute component={MovieListContainer} />

				<Route path="/map/:id" component={MovieMapContainer} />

				<Route path="/about" component={About}/>

				<Route path="*" component={MovieListContainer} />
			</Route>
		</Router>
	</Provider>,
	document.getElementById('root')
);
