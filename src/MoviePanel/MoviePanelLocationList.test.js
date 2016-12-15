import React from 'react';
import { shallow, render, mount } from 'enzyme';
import MoviePanelLocationList from './MoviePanelLocationList';

const defaultProps = {
	locations: [
		{
			origAddress: 'a',
			funFacts: 'a',
			address: 'a',
			lat: 0,
			lon: 0
		}
	],
	onLocationClick: jest.fn()
};

describe('<MoviePanelLocationList />', () => {
	it('renders without crashing', () => {
		shallow(
			<MoviePanelLocationList {...defaultProps}/>
		);
	});
	it('calls onLocationClick with the location when clicking on an item', () => {
		const wrapper = mount(
			<MoviePanelLocationList {...defaultProps}/>
		);
		wrapper.find('.movie-panel-locations__elem').simulate('click');
		expect(defaultProps.onLocationClick).toHaveBeenCalled();
	})
});
