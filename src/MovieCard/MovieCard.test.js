import React from 'react';
import { shallow } from 'enzyme';
import LazyMovieCard, { MovieCard } from './MovieCard';

const defaultProps = {
	mData: {
		movie: {
			id: '',
			year: '',
			title: '',
			genres: [],
			voteCount: 0,
			voteAverage: 10
		}
	},
	onClick: () => {},
	genres: {}
};

describe('<MovieCard />', () => {
	it('renders without crashing', () => {
		shallow(<MovieCard {...defaultProps}/>);
	});
});

describe('<LazyMovieCard />', () => {
	it('renders without crashing', () => {
		shallow(<LazyMovieCard {...defaultProps}/>);
	});
});
