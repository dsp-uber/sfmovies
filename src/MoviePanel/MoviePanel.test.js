import React from 'react';
import { shallow } from 'enzyme';
import store from '../app/store';
import { Provider } from 'react-redux';
import MoviePanel from './MoviePanel';

const defaultProps = {
	movie: {
		id: '',
		originalTitle: '',
		year: '',
		genres: [],
	}

};

describe('<MovieMap />', () => {
	it('renders without crashing', () => {
		shallow(
			<Provider store={store}>
				<MoviePanel {...defaultProps}/>
			</Provider>
		);
	});
});
