import reducer from './ui';
import * as ui from './ui';

describe('ducks/ui', () => {
	describe('setFirstRun', () => {
		const isFirstRun = false;
		it('returns the new state correctly', () => {
			const prevState = {
				isFirstRun: true
			};
			expect(reducer(prevState, ui.setFirstRun(isFirstRun))).toEqual({
				isFirstRun
			});
		});
		describe('isLoading w/ retain & release', () => {
			describe('retain', () => {
				it('returns the new state correctly', () => {
					const retainInitState = {
						_refCount: 0,
						isLoading: false
					};
					const retainNextState = {
						_refCount: 1,
						isLoading: true
					};
					expect(
						reducer(retainInitState, ui.retain())
					).toEqual(retainNextState);
					expect(reducer(retainNextState, ui.retain())).toEqual({
						_refCount: 2,
						isLoading: true
					});
				});
			});
			describe('release', () => {
				it('returns the new state correctly', () => {
					const releaseInitState = {
						_refCount: 2,
						isLoading: true
					};
					const releaseNextState = {
						_refCount: 1,
						isLoading: true
					};
					expect(
						reducer(releaseInitState, ui.release())
					).toEqual(releaseNextState);
					expect(reducer(releaseNextState, ui.release())).toEqual({
						_refCount: 0,
						isLoading: false
					});
				});
			});
		});
	});
});
