// Actions
const SET_FIRST_RUN = 'sfmovies/ui/SET_FIRST_RUN';

const UI_INIT = {
	isFirstRun: true
};

// Reducer
export default function reducer(state = UI_INIT, action = {}) {
	switch (action.type) {
		case SET_FIRST_RUN:
			return Object.assign({}, state, {
				isFirstRun: action.isFirstRun
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
