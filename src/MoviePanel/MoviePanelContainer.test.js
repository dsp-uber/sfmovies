import React from 'react';
import { shallow } from 'enzyme';
import store from '../app/store';
import { Provider } from 'react-redux';
import MoviePanelContainer from './MoviePanelContainer';

describe('<MoviePanelContainer />', () => {
	it('renders without crashing', () => {
		shallow(
			<Provider store={store}>
				<MoviePanelContainer />
			</Provider>
		);
	});
});
