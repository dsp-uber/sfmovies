import React from 'react';
import { shallow } from 'enzyme';
import store from '../app/store';
import { Provider } from 'react-redux';
import MovieListContainer from './MovieListContainer';

describe('<MovieListContainer />', () => {
	it('renders without crashing', () => {
		shallow(
			<Provider store={store}>
				<MovieListContainer />
			</Provider>
		);
	});
});
