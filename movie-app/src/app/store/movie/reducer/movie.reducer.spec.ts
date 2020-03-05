import { createAction } from '@ngrx/store';
import { Movie } from '../../../models/movie.model';
import { DetailedMovie } from '../../../models/detailed-movie.model';
import { reducer, initialState, MovieState } from './movie.reducer';
import {
  MovieActionTypes,
  search,
  reset,
  searchSuccess,
  searchFail,
  getDetailed,
  getDetailedSuccess,
  getDetailedFail
} from '../actions/movie.actions';

describe('Movie Reducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = createAction('NOOP');
      const result = reducer(undefined, action);
      expect(result).toBe(initialState);
    });
  });

  describe(MovieActionTypes.MOVIE_RESET, () => {
    it('should return the default state', () => {
      const action = reset;
      const result = reducer(undefined, action);
      expect(result).toEqual({
        title: '',
        isLoading: false,
        errorMessage: undefined,
        movies: [],
        detailedMovie: undefined
      });
    });
  });

  describe(MovieActionTypes.MOVIE_SEARCH, () => {
    it('should toggle on isLoading and update title in state', () => {
      const title = 'title';
      const action = search({ title });
      const result = reducer(initialState, action);
      expect(result).toEqual({
        ...initialState,
        isLoading: true,
        title
      });
    });
  });

  const searchState: MovieState = {
    title: 'title',
    isLoading: true,
    errorMessage: undefined,
    movies: [],
    detailedMovie: undefined
  };

  describe(MovieActionTypes.MOVIE_SEARCH_SUCCESS, () => {
    it('should toggle off isLoading and update movies in state', () => {
      const movies: Movie[] = [{ imdbId: 'imdbId', posterUrl: 'posterUrl' }];
      const action = searchSuccess({ movies });
      const result = reducer(searchState, action);
      expect(result).toEqual({
        ...searchState,
        isLoading: false,
        movies
      });
    });
  });

  describe(MovieActionTypes.MOVIE_SEARCH_FAIL, () => {
    it('should toggle off isLoading and update error in state', () => {
      const error = new Error('an error occured');
      const action = searchFail({ error });
      const result = reducer(searchState, action);
      expect(result).toEqual({
        ...searchState,
        isLoading: false,
        errorMessage: error.message
      });
    });
  });

  describe(MovieActionTypes.MOVIE_GET_DETAILED, () => {
    it('should toggle on isLoading', () => {
      const id = 'id';
      const action = getDetailed({ id });
      const result = reducer(initialState, action);
      expect(result).toEqual({
        ...initialState,
        isLoading: true
      });
    });
  });

  const getDetailedMovieState: MovieState = {
    title: 'title',
    isLoading: true,
    errorMessage: undefined,
    movies: [{ imdbId: 'imdbId', posterUrl: 'posterUrl' }],
    detailedMovie: undefined
  };

  describe(MovieActionTypes.MOVIE_GET_DETAILED_SUCCES, () => {
    it('should toggle off isLoading and update detailed movie in state', () => {
      const detailedMovie: DetailedMovie = {
        imdbId: 'id',
        title: 'title',
        year: 'year',
        rating: 'rating',
        runTime: 'runTime',
        posterUrl: 'posterUrl',
        actors: ['actor1', 'actor2'],
        writers: ['writer1', 'writer2'],
        plot: 'plot'
      };
      const action = getDetailedSuccess({ detailedMovie });
      const result = reducer(getDetailedMovieState, action);
      expect(result).toEqual({
        ...getDetailedMovieState,
        isLoading: false,
        detailedMovie
      });
    });
  });

  describe(MovieActionTypes.MOVIE_GET_DETAILED_FAIL, () => {
    it('should toggle off isLoading and update error in state', () => {
      const error = new Error('an error occured');
      const action = getDetailedFail({ error });
      const result = reducer(getDetailedMovieState, action);
      expect(result).toEqual({
        ...getDetailedMovieState,
        isLoading: false,
        errorMessage: error.message
      });
    });
  });
});
