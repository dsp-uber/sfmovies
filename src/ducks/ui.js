// Actions
const SET_FIRST_RUN = 'sfmovies/ui/SET_FIRST_RUN';
const RETAIN = 'sfmovies/ui/RETAIN';
const RELEASE = 'sfmovies/ui/RELEASE';

const UI_INIT = {
	isFirstRun: true,
	isLoading: true,

	_refCount: 0
};

// Reducer
export default function reducer(state = UI_INIT, action = {}) {
	switch (action.type) {
		case SET_FIRST_RUN:
			return {
				...state,
				isFirstRun: action.isFirstRun
			};
		case RETAIN:
			const refCountAfterRetain = (state._refCount + 1);
			return {
				...state,
				_refCount: refCountAfterRetain,
				isLoading: refCountAfterRetain > 0 ? true : false
			};
		case RELEASE:
			const refCountAfterRelease = (state._refCount - 1);
			return {
				...state,
				_refCount: refCountAfterRelease,
				isLoading: refCountAfterRelease > 0 ? true : false
			};

		default:
			return state;
	}
}

// Action Creators
export function setFirstRun(isFirstRun) {
	return {
		type: SET_FIRST_RUN,
		isFirstRun
	};
}
export function retain() {
	return {
		type: RETAIN
	};
}
export function release() {
	return {
		type: RELEASE
	};
}
