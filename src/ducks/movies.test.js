jest.unmock('nock');
import nock from 'nock';

jest.unmock('moviedb');
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import reducer, * as movies from './movies';
import * as ui from './ui';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockLoadAllMovies = (mockAllMovies) => {
	nock(window.location.protocol + '//' + window.location.host)
		.get(process.env.PUBLIC_URL + '/static/movies.json')
		.reply(200, JSON.stringify(mockAllMovies));
};
const mockLoadGenres = (mockGenres) => {
	nock(window.location.protocol + '//' + window.location.host)
		.get(process.env.PUBLIC_URL + '/static/genres.json')
		.reply(200, JSON.stringify(mockGenres));
}

describe('ducks/movies', () => {
	afterEach(() => {
		nock.cleanAll();
	});
	describe('setActiveMovie', () => {
		const movie = {
			id: '1'
		};
		it('returns the new state correctly', () => {
			const prevState = {
				activeMovie: {}
			};
			expect(reducer(prevState, movies.setActiveMovie(movie))).toEqual({
				activeMovie: movie
			});
		});
	});
	describe('setAllMovies', () => {
		const allMovies = [
			{id: '1'}
		];
		it('returns the new state correctly', () => {
			const prevState = {
				allMovies: []
			};
			expect(reducer(prevState, movies.setAllMovies(allMovies))).toEqual({
				allMovies
			});
		});
	});
	describe('setVisibleMovies', () => {
		const visibleMovies = [
			{id: '1'}
		];
		it('returns the new state correctly', () => {
			const prevState = {
				visibleMovies: []
			};
			expect(reducer(prevState, movies.setVisibleMovies(visibleMovies))).toEqual({
				visibleMovies
			});
		});
	});
	describe('setGenres', () => {
		const genres = {
			1: 'Genre'
		};
		it('returns the new state correctly', () => {
			const prevState = {
				genres: {}
			};
			expect(reducer(prevState, movies.setGenres(genres))).toEqual({
				genres
			});
		});
	});
	describe('setShowTrailer', () => {
		const showTrailer = true;
		it('returns the new state correctly', () => {
			const prevState = {
				showTrailer: false
			};
			expect(reducer(prevState, movies.setShowTrailer(showTrailer))).toEqual({
				showTrailer
			});
		});
	});
	describe('setSearchQuery', () => {
		const searchQuery = '1';
		it('returns the new state correctly', () => {
			const prevState = {
				searchQuery: ''
			};
			expect(reducer(prevState, movies.setSearchQuery(searchQuery))).toEqual({
				searchQuery
			});
		});
	});

	describe('thunk actions', () => {
		describe('sync', () => {
			describe('navToMovieList', () => {
				const expectedActions = [
					{type: movies.NAV_TO_MOVIE_LIST},
					{type: '@@router/CALL_HISTORY_METHOD', payload: {args: [{search: ''}], 'method': 'push'}}
				];

				const store = mockStore({});
				it('navigates to /', () => {
					store.dispatch(movies.navToMovieList())
					expect(store.getActions()).toEqual(expectedActions);
				});
			});
		});

		describe('async', () => {
			describe('allMovies', () => {
				const mockAllMovies = [{}, {}, {}];
				beforeEach(() => {
					mockLoadAllMovies(mockAllMovies);
				});
				describe('fetchAllMovies', () => {
					it('resolves if the movies are already fetched', () => {
						const expectedActions = [
							{type: movies.FETCH_ALL_MOVIES_REQUEST}
						];

						const store = mockStore({
							movies: {
								allMovies: mockAllMovies
							}
						});
						return store.dispatch(movies.fetchAllMovies()).then(() => {
							expect(store.getActions()).toEqual(expectedActions)
						});
					});
					it('returns the new state correctly', () => {
						const expectedActions = [
							{type: movies.FETCH_ALL_MOVIES_REQUEST},
							{type: ui.RETAIN},
							{type: ui.RELEASE},
							{type: movies.SET_ALL_MOVIES, allMovies: mockAllMovies},
							{type: movies.SET_VISIBLE_MOVIES, visibleMovies: mockAllMovies}
						];
						const store = mockStore({
							movies: {
								allMovies: []
							}
						});

						return store.dispatch(movies.fetchAllMovies()).then(() => {
							expect(store.getActions()).toEqual(expectedActions)
						});
					});
				});
				describe('fetchAllMoviesAndShowMovieList', () => {
					it('dispatches the correct actions', () => {
						const expectedActions = [
							{type: movies.FETCH_ALL_MOVIES_AND_SHOW_MOVIE_LIST},
							{type: movies.FETCH_ALL_MOVIES_REQUEST},
							{type: movies.NAV_TO_MOVIE_LIST}
						];
						const store = mockStore({
							movies: {
								allMovies: []
							}
						});

						return store.dispatch(movies.fetchAllMoviesAndShowMovieList())
							.then(() => {
								expectedActions.forEach(function(expectedAction) {
									expect(store.getActions()).toContainEqual(expectedAction);
								});
							});
					})
				});
			});

			describe('fetchGenres', () => {
				const mockGenres = {
					1: 'a',
					2: 'b'
				};
				beforeEach(() => {
					mockLoadGenres(mockGenres);
				});

				it('resolves if the genres are already fetched', () => {
					const expectedActions = [
						{type: movies.FETCH_GENRES_REQUEST}
					];
					const store = mockStore({
						movies: {
							genres: mockGenres
						}
					});
					return store.dispatch(movies.fetchGenres()).then(() => {
						expect(store.getActions()).toEqual(expectedActions)
					});
				});
				it('dispatches the correct actions', () => {
					const expectedActions = [
						{type: movies.FETCH_GENRES_REQUEST},
						{type: ui.RETAIN},
						{type: ui.RELEASE},
						{type: movies.SET_GENRES, genres: mockGenres},
					];
					const store = mockStore({
						movies: {
							genres: {}
						}
					});
					return store.dispatch(movies.fetchGenres()).then(() => {
						expect(store.getActions()).toEqual(expectedActions)
					});
				});
			});

			describe('fetchMovie', () => {
				const mockMovieWithoutTmdbId = {
					movie: {
						id: '1'
					},
					locations: [{}, {}]
				};
				const mockMovieWithTmdbId = {
					movie: {
						id: '1',
						tmdbId: '1'
					},
					locations: [{}, {}]
				};
				const enrichedMovieWIthTmdbId = {
					...mockMovieWithTmdbId,
					movie: {
						...mockMovieWithTmdbId.movie,
						youtubeTrailerId: 'a',
						imdbId: '1',
						backdropPath: undefined,
						budget: undefined,
						overview: undefined,
						releaseDate: undefined,
						revenue: undefined,
						runtime: undefined,
						tagline: undefined
					}
				};

				beforeEach(() => {
					const tmdbBaseUrl = 'https://api.themoviedb.org';
					nock(tmdbBaseUrl)
						.get((uri) => (uri.indexOf('authentication') !== -1))
						.query(() => true)
						.reply(200, JSON.stringify({
							success: true,
							expires_at: '3000-01-01 00:00:01 UTC',
							request_token: 'a',
						}));

					nock(tmdbBaseUrl)
						.get((uri) => (
							uri.indexOf('movie') !== -1 &&
							uri.indexOf('videos') === -1
						))
						.query(() => true)
						.reply(200, {
							imdbId: '1'
						});
					nock(tmdbBaseUrl)
						.get((uri) => (
							uri.indexOf('movie') !== -1 &&
							uri.indexOf('videos') !== -1
						))
						.query(() => true)
						.reply(200, {
							results: [
								{
									site: 'youtube',
									key: 'a'
								}
							]
						});
				});
				describe('fetchMovieFromTMDbAndSetActive', () => {
					it('does not fetch the movie without a tmdbId', () => {
						const expectedActions = [
							{type: movies.FETCH_MOVIE_FROM_TMDB_AND_SET_ACTIVE_REQUEST},
							{type: movies.SHOW_MOVIE_ON_MAP},
							{type: movies.SET_ACTIVE_MOVIE, movie: mockMovieWithoutTmdbId},
							{type: movies.NAV_TO_MOVIE_MAP},
							{type: '@@router/CALL_HISTORY_METHOD',
								payload: {args: [{search: 'map/1'}], method: 'push'}
							}
						];
						const store = mockStore({
							movies: {}
						});
						return store.dispatch(
							movies.fetchMovieFromTMDbAndSetActive(mockMovieWithoutTmdbId)
						).then(() => {
							expect(store.getActions()).toEqual(expectedActions)
						});
					});
					it('fetches the movie with a tmdbId', () => {
						const expectedActions = [
							{type: movies.FETCH_MOVIE_FROM_TMDB_AND_SET_ACTIVE_REQUEST},
							{type: ui.RETAIN},
							{type: movies.FETCH_TMDB_INFO_REQUEST},
							{type: movies.FETCH_TMDB_VIDEOS_REQUEST},
							{type: ui.RELEASE},
							{type: movies.SHOW_MOVIE_ON_MAP},
							{type: movies.SET_ACTIVE_MOVIE, movie: {
								...mockMovieWithTmdbId,
								movie: {
									...mockMovieWithTmdbId.movie,
									youtubeTrailerId: 'a',
									imdbId: '1',
									backdropPath: undefined,
									budget: undefined,
									overview: undefined,
									releaseDate: undefined,
									revenue: undefined,
									runtime: undefined,
									tagline: undefined
								}
							}},
							{type: movies.NAV_TO_MOVIE_MAP},
							{type: '@@router/CALL_HISTORY_METHOD',
								payload: {args: [{search: 'map/1'}], method: 'push'}
							}
						];
						const store = mockStore({
							movies: {}
						});

						return store.dispatch(
							movies.fetchMovieFromTMDbAndSetActive(mockMovieWithTmdbId)
						).then(() => {
							expect(store.getActions()).toEqual(expectedActions)
						});
					});
				});
				describe('loadMovieById', () => {
					it('dispatches the correct actions', () => {
						const mockAllMovies = [{}, {}, {}];
						mockLoadAllMovies(mockAllMovies);
						const mockGenres = {};
						mockLoadGenres(mockGenres);

						const expectedActions = [
							{type: movies.LOAD_MOVIE_BY_ID},
							{type: ui.RETAIN},

							{type: movies.FETCH_GENRES_REQUEST},

							{type: ui.RETAIN},
							{type: ui.RELEASE},

							{type: movies.SET_GENRES, genres: {}},
							{type: movies.FETCH_ALL_MOVIES_REQUEST},

							// {type: movies.SET_ALL_MOVIES, allMovies: mockAllMovies},
							// {type: movies.SET_VISIBLE_MOVIES, visibleMovies: mockAllMovies},

							{type: ui.RELEASE},
							{type: movies.FETCH_MOVIE_FROM_TMDB_AND_SET_ACTIVE_REQUEST},
							{type: ui.RETAIN},
							{type: movies.FETCH_TMDB_INFO_REQUEST},
							{type: movies.FETCH_TMDB_VIDEOS_REQUEST},
							{type: ui.RELEASE},
							{type: movies.SHOW_MOVIE_ON_MAP},
							{type: movies.SET_ACTIVE_MOVIE, movie: enrichedMovieWIthTmdbId},
							{type: movies.NAV_TO_MOVIE_MAP},
							{type: '@@router/CALL_HISTORY_METHOD',
								payload: {args: [{search: 'map/1'}], method: 'push'}
							}
						];
						const store = mockStore({
							movies: {
								allMovies: [enrichedMovieWIthTmdbId],
								visibleMovies: [enrichedMovieWIthTmdbId],
								genres: {},
								activeMovie: enrichedMovieWIthTmdbId
							}
						});

						return store.dispatch(
							movies.loadMovieById('1')
						).then(() => {
							expect(store.getActions()).toEqual(expectedActions)
						});
					});
				});
			});
			xdescribe('showMovieOnMap');
			xdescribe('navToMovieMap');
			xdescribe('filterMovies');
		});
	});
});
