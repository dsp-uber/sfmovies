import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import sfMoviesApp from './app/duck';
import Root from './app/Root';

import 'material-design-lite/material.css';
import './material.amber-orange.min.css';
import 'material-design-lite';

let store = createStore(sfMoviesApp);

ReactDOM.render(
	<Root store={store}></Root>,
	document.getElementById('root')
);
