import React from 'react';
import { shallow, render, mount } from 'enzyme';
import store from '../app/store';
import { Provider } from 'react-redux';
import MoviePanelHeader from './MoviePanelHeader';

const defaultProps = {
	movie: {
		id: '',
		originalTitle: '',
		year: '',
		genres: [],
		youtubeTrailerId: '1'
	},
	genres: {},
	onTrailerClick: jest.fn()
};

describe('<MoviePanelHeader />', () => {
	it('renders without crashing', () => {
		shallow(
			<Provider store={store}>
				<MoviePanelHeader {...defaultProps}/>
			</Provider>
		);
	});
	it('calls shows the fab button when there is a trailerId', () => {
		const wrapper = render(
			<Provider store={store}>
				<MoviePanelHeader {...defaultProps}/>
			</Provider>
		);
		expect(wrapper.find('.movie-panel-header__fab').length).toBe(1);
	});
	it('calls onTrailerClick when clicking on the fab button', () => {
		const wrapper = mount(
			<Provider store={store}>
				<MoviePanelHeader {...defaultProps}/>
			</Provider>
		);
		wrapper.find('.movie-panel-header__fab').simulate('click');
		expect(defaultProps.onTrailerClick).toHaveBeenCalled();
	});
});
