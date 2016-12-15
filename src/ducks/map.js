// Actions
export const SET_MAP_CENTER = 'sfmovies/map/SET_MAP_CENTER';
export const SET_MAP_ZOOM = 'sfmovies/map/SET_MAP_ZOOM';

export const MAP_INIT = {
	mapCenter: {
		lat: 0,
		lng: 0
	},
	mapZoom: 13
};

// Reducer
export default function reducer(state = MAP_INIT, action = {}) {
	switch (action.type) {
		case SET_MAP_CENTER:
			return {
				...state,
				mapCenter: action.mapCenter
			};
		case SET_MAP_ZOOM:
			return {
				...state,
				mapZoom: action.mapZoom
			};
		default:
			return state;
	}
}

// Action Creators
export function setMapCenter(mapCenter) {
	return {
		type: SET_MAP_CENTER,
		mapCenter
	};
}
export function setMapZoom(mapZoom) {
	return {
		type: SET_MAP_ZOOM,
		mapZoom
	};
}
