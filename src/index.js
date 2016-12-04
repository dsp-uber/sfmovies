import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import 'material-design-lite/material.css';
import 'material-design-lite';

import App from './app/App';
import MovieList from './MovieList/MovieList';
import MovieMap from './MovieMap/MovieMap';

ReactDOM.render(
	<Router history={browserHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={MovieList} />
			<Route path="map" component={MovieMap}>
				<Route path="/map/:movieId" component={MovieMap}/>
			</Route>
		</Route>
	</Router>,
	document.getElementById('root')
);
