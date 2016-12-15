import React from 'react';
import { shallow } from 'enzyme';
import store from '../app/store';
import { Provider } from 'react-redux';
import MovieMapContainer from './MovieMapContainer';

describe('<MovieMapContainer />', () => {
	it('renders without crashing', () => {
		shallow(
			<Provider store={store}>
				<MovieMapContainer />
			</Provider>
		);
	});
});
