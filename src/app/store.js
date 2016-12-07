import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { hashHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';

import ui from '../ducks/ui';
import movies from '../ducks/movies';

const reducer = combineReducers(Object.assign({}, {
		ui,
		movies
	}, {
		routing: routerReducer
	})
);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(
	applyMiddleware(
		thunk
	)
));

export const history = syncHistoryWithStore(hashHistory, store);

export default store;
