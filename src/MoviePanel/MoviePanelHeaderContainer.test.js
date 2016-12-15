import React from 'react';
import { shallow } from 'enzyme';
import store from '../app/store';
import { Provider } from 'react-redux';
import MoviePanelHeaderContainer from './MoviePanelHeaderContainer';

describe('<MoviePanelHeaderContainer />', () => {
	it('renders without crashing', () => {
		shallow(
			<Provider store={store}>
				<MoviePanelHeaderContainer />
			</Provider>
		);
	});
});
