import React from 'react';
import { shallow } from 'enzyme';
import store from '../app/store';
import { Provider } from 'react-redux';
import AppContainer from './AppContainer';

describe('<AppContainer />', () => {
	it('renders without crashing', () => {
		shallow(
			<Provider store={store}>
				<AppContainer />
			</Provider>
		);
	});
});
