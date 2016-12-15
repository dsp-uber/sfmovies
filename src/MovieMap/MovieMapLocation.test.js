import React from 'react';
import { shallow } from 'enzyme';
import MovieMapLocation from './MovieMapLocation';

const defaultProps = {
	label: ''
};

describe('<MovieMapLocation />', () => {
	it('renders without crashing', () => {
		shallow(
			<MovieMapLocation {...defaultProps}/>
		);
	});});
