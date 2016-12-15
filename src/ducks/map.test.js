import reducer from './map';
import * as map from './map';

describe('ducks/map', () => {
	describe('mapCenter', () => {
		const mapCenter = {lat: 0, lng: 0};
		it('returns the new state correctly', () => {
			const prevState = {
				mapCenter: {lat: 100, lng: 100}
			};
			expect(reducer(prevState, map.setMapCenter(mapCenter))).toEqual({
				mapCenter
			});
		});
	});
	describe('mapZoom', () => {
		const mapZoom = 10;
		it('returns the new state correctly', () => {
			const prevState = {
				mapZoom: 1
			};
			expect(reducer(prevState, map.setMapZoom(mapZoom))).toEqual({
				mapZoom
			});
		});
	});
});
