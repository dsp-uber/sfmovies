import React from 'react';
import { shallow } from 'enzyme';
import genres from '../../public/static/genres.json';
import MovieGenres from './MovieGenres';

describe('<MovieGenres />', () => {
	const defaultProps = {
		movieGenres: [],
		genres: genres
	};

	it('renders without crashing', () => {
		shallow(<MovieGenres {...defaultProps} />);
	});

	it('can render a single genre', () => {
		const singleGenreProps = {
			...defaultProps,
			movieGenres: [878]
		};
		const wrapper = shallow(<MovieGenres {...singleGenreProps}/>);
		const out = (
			<div className="movie-genres" title="Science Fiction">
				Science Fiction
			</div>
		);
		expect(wrapper.contains(out)).toEqual(true);
	});

	it('renders a multiple genres separated by a comma', () => {
		const multipleGenreProps = {
			...defaultProps,
			movieGenres: [37, 878]
		};
		const wrapper = shallow(<MovieGenres {...multipleGenreProps}/>);
		const out = (
			<div className="movie-genres" title="Western, Science Fiction">
				Western, Science Fiction
			</div>
		);
		expect(wrapper.contains(out)).toEqual(true);
	});
});
