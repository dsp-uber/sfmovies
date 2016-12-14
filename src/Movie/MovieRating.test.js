import React from 'react';
import { shallow, render } from 'enzyme';
import MovieRating from './MovieRating';

describe('<MovieRating />', () => {
	const defaultProps = {
		voteAverage: 0,
		voteCount: 0
	};

	it('renders without crashing', () => {
		shallow(<MovieRating {...defaultProps} />);
	});

	it('renders a half star for fractional vote averages', () => {
		const fractionalVoteProps = {
			...defaultProps,
			voteAverage: 4.6
		};
		const wrapper = render(<MovieRating {...fractionalVoteProps} />);
		expect(wrapper.text()).toContain('star_half');
	});
});
