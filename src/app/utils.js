export const generateUrl = (state) => {
	let { search } = state;
	let url = '';

	if (search) {
		url += `?search=${state.search}&`;
	}

	return url;
}

// http://james.padolsey.com/javascript/bujs-1-getparameterbyname/
export const getParameterByName = (name) => {
	var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
	return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

export const getAbsImgPath = (relImgPath) => (
	`https://image.tmdb.org/t/p/w780/${relImgPath}`
);
