import React from 'react';
import { shallow } from 'enzyme';
import store from '../app/store';
import { Provider } from 'react-redux';
import MovieGenresContainer from './MovieGenresContainer';

describe('<MovieGenresContainer />', () => {
	it('renders without crashing', () => {
		shallow(
			<Provider store={store}>
				<MovieGenresContainer />
			</Provider>
		);
	});
});
