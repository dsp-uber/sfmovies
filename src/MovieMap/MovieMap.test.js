import React from 'react';
import { shallow, mount } from 'enzyme';
import store from '../app/store';
import { Provider } from 'react-redux';
import MovieMap, { getBounds } from './MovieMap';

const defaultProps = {
	movie: {
		id: '',
		originalTitle: '',
		year: '',
		genres: [],
	},
	genres: [],
	locations: [
		{
			id: '',
			movieId: '',
			origAddress: ''
		}
	],
	routeParams: {},
	navToMovieList: jest.fn(),
	fetchMovieById: jest.fn(() => (Promise.resolve())),
	setMapCenterAndZoom: jest.fn(),
	onOverlayClick: jest.fn(),
};

describe('<MovieMap />', () => {
	it('renders without crashing', () => {
		shallow(
			<Provider store={store}>
				<MovieMap {...defaultProps}/>
			</Provider>
		);
	});

	it('navigates back to the MovieList if there is no ID in the URL', () => {
		mount(
			<Provider store={store}>
				<MovieMap {...defaultProps}/>
			</Provider>
		);
		expect(defaultProps.navToMovieList).toHaveBeenCalled();
	});
	it('loads a movie and centers the map if there is an ID in the URL', () => {
		const defaultPropsWithId = {
			...defaultProps,
			routeParams: {
				id: '1'
			}
		};
		mount(
			<Provider store={store}>
				<MovieMap {...defaultPropsWithId}/>
			</Provider>
		);
		expect(defaultPropsWithId.fetchMovieById).toHaveBeenCalled();
		defaultPropsWithId.fetchMovieById().then(() => {
			expect(defaultPropsWithId.setMapCenterAndZoom).toHaveBeenCalled();
		});
	});
	it('centers the map if there is an active movie passed to it', () => {
		const defaultPropsWithMovie = {
			...defaultProps,
			routeParams: {
				id: '1'
			},
			movie: {
				...defaultProps.movie,
				id: '1'
			},
			isLoading: true
		};
		mount(
			<Provider store={store}>
				<MovieMap {...defaultPropsWithMovie}/>
			</Provider>
		);
		expect(defaultPropsWithMovie.setMapCenterAndZoom).toHaveBeenCalled();
	});
});

describe('MovieMap.getBounds', () => {
	it('finds the edges of locations and center passed into it', () => {
		const locations = [
			{lat: 0, lon: 0},
			{lat: 25, lon: 25},
			{lat: 50, lon: 50},
			{lat: 75, lon: 75},
			{lat: 100, lon: 100}
		];
		expect(getBounds({locations})).toEqual({
			nw: {lat: 0, lng: 100},
			se: {lat: 100, lng: 0},
			center: {lat: 50, lng: 50}
		});
	});
});
