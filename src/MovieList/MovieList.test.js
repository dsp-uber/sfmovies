import React from 'react';
import { shallow } from 'enzyme';
import MovieList from './MovieList';

const defaultProps = {
	movies: [],
	onMovieClick: () => {},
	onSearch: () => {}
};

describe('<MovieList />', () => {
	it('renders without crashing', () => {
		shallow(<MovieList {...defaultProps}/>);
	});
});
