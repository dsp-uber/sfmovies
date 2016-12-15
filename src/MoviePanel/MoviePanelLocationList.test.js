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
	it('renders locations with funFacts on 3 lines', () => {
		const wrapper = render(
			<MoviePanelLocationList {...defaultProps}/>
		);
		expect(wrapper.find('.mdl-list__item--three-line').length).toBe(1);
	});
	it('renders locations without funFacts on 2 lines', () => {
		const defaultPropsWithoutFunFacts = {
			...defaultProps,
			locations: [
				{
					...defaultProps.locations[0],
					funFacts: null
				}
			]
		};
		const wrapper = render(
			<MoviePanelLocationList {...defaultPropsWithoutFunFacts}/>
		);
		expect(wrapper.find('.mdl-list__item--three-line').length).toBe(0);
	});
	it('calls onLocationClick with the location when clicking on an item', () => {
		const wrapper = mount(
			<MoviePanelLocationList {...defaultProps}/>
		);
		wrapper.find('.movie-panel-locations__elem').simulate('click');
		expect(defaultProps.onLocationClick).toHaveBeenCalled();
	})
});
