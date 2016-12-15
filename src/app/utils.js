/**
 * Absolute image path for posters and backdrops from tmdb
 */
export const getAbsImgPath = (relImgPath) => (
	`https://image.tmdb.org/t/p/w780/${relImgPath}`
);
