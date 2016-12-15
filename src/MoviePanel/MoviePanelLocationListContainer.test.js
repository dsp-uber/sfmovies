import React from 'react';
import { shallow } from 'enzyme';
import store from '../app/store';
import { Provider } from 'react-redux';
import MoviePanelLocationListContainer from './MoviePanelLocationListContainer';

describe('<MoviePanelLocationListContainer />', () => {
	it('renders without crashing', () => {
		shallow(
			<Provider store={store}>
				<MoviePanelLocationListContainer />
			</Provider>
		);
	});
});
