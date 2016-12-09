// Actions
const SET_FIRST_RUN = 'sfmovies/ui/SET_FIRST_RUN';
const SET_LOADING = 'sfmovies/ui/SET_LOADING';

const UI_INIT = {
	isFirstRun: true,
	isLoading: false
};

// Reducer
export default function reducer(state = UI_INIT, action = {}) {
	switch (action.type) {
		case SET_FIRST_RUN:
			return Object.assign({}, state, {
				isFirstRun: action.isFirstRun
			});
		case SET_LOADING:
			return Object.assign({}, state, {
				isLoading: action.isLoading
			});
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
export function setLoading(isLoading) {
	return {
		type: SET_LOADING,
		isLoading
	};
}
