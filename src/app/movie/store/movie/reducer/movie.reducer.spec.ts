import { createAction } from '@ngrx/store';
import { Movie } from '../../../models/movie.model';
import { DetailedMovie } from '../../../models/detailed-movie.model';
import * as MovieStore from '..';

describe('Movie Reducer', () => {
  const movies: Movie[] = [
    { imdbId: 'imdbId1', posterUrl: 'posterUrl1', title: 'title1' },
    { imdbId: 'imdbId2', posterUrl: 'posterUrl2', title: 'title2' },
  ];

  const detailedMovie: DetailedMovie = {
    imdbId: 'id',
    title: 'title',
    year: 'year',
    rating: 'rating',
    runTime: 'runTime',
    posterUrl: 'posterUrl',
    actors: ['actor1', 'actor2'],
    writers: ['writer1', 'writer2'],
    plot: 'plot',
  };

  const error = new Error('an error occured');

  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = createAction('NOOP');
      const result = MovieStore.reducer(undefined, action);
      expect(result).toBe(MovieStore.initialState);
    });
  });

  describe(MovieStore.reset.type, () => {
    it('should return the default state', () => {
      const title = 'title';

      const searchedMovies = {
        [title]: movies,
      };

      const state: MovieStore.MovieState = {
        title: 'title',
        isLoading: true,
        errorMessage: error.message,
        detailedMovie,
        searchedMovies,
      };
      const action = MovieStore.reset;
      const result = MovieStore.reducer(state, action);
      expect(result).toEqual({
        title: '',
        isLoading: false,
        errorMessage: undefined,
        detailedMovie: undefined,
        searchedMovies,
      });
    });
  });

  describe(MovieStore.search.type, () => {
    it('should toggle on isLoading and update title in state', () => {
      const state: MovieStore.MovieState = {
        title: '',
        isLoading: false,
        errorMessage: undefined,
        detailedMovie: undefined,
        searchedMovies: {},
      };
      const title = 'title';
      const action = MovieStore.search({ title });
      const result = MovieStore.reducer(state, action);
      expect(result).toEqual({
        ...state,
        isLoading: true,
        title,
      });
    });
  });

  describe(MovieStore.searchSuccess.type, () => {
    it('should toggle off isLoading and update movies in state', () => {
      const searchedMovies = { '': movies };

      const state: MovieStore.MovieState = {
        title: '',
        isLoading: true,
        errorMessage: error.message,
        detailedMovie: undefined,
        searchedMovies: {},
      };

      const action = MovieStore.searchSuccess({ movies });

      const result = MovieStore.reducer(state, action);

      expect(result).toEqual({
        ...state,
        isLoading: false,
        searchedMovies,
      });
    });
  });

  describe(MovieStore.getDetailed.type, () => {
    it('should toggle on isLoading and remove error message and detailed movie from state', () => {
      const state: MovieStore.MovieState = {
        title: '',
        isLoading: false,
        errorMessage: error.message,
        detailedMovie,
        searchedMovies: {},
      };
      const id = 'id';
      const action = MovieStore.getDetailed({ id });
      const result = MovieStore.reducer(state, action);
      expect(result).toEqual({
        ...state,
        isLoading: true,
        errorMessage: undefined,
        detailedMovie: undefined,
        searchedMovies: {},
      });
    });
  });

  describe(MovieStore.getDetailedSuccess.type, () => {
    it('should toggle off isLoading and update detailed movie in state', () => {
      const state: MovieStore.MovieState = {
        title: '',
        isLoading: true,
        errorMessage: undefined,
        detailedMovie: undefined,
        searchedMovies: {},
      };
      const action = MovieStore.getDetailedSuccess({ detailedMovie });
      const result = MovieStore.reducer(state, action);
      expect(result).toEqual({
        ...state,
        isLoading: false,
        detailedMovie,
        searchedMovies: {},
      });
    });
  });

  describe(`${MovieStore.searchFail.type}, ${MovieStore.getDetailedFail.type}`, () => {
    it('should toggle off isLoading and update error in state', () => {
      const state: MovieStore.MovieState = {
        title: '',
        isLoading: true,
        errorMessage: undefined,
        detailedMovie: undefined,
        searchedMovies: {},
      };

      const actionSearchFail = MovieStore.searchFail({ error });
      const resultSearchFail = MovieStore.reducer(state, actionSearchFail);

      const actionGetDetailedFail = MovieStore.getDetailedFail({ error });
      const resultGetDetailedFail = MovieStore.reducer(
        state,
        actionGetDetailedFail
      );

      [resultSearchFail, resultGetDetailedFail].forEach((result) =>
        expect(result).toEqual({
          ...state,
          isLoading: false,
          errorMessage: error.message,
        })
      );
    });
  });

  describe(MovieStore.reloadSearchedMovies.type, () => {
    it('should set title and movies in state', () => {
      const title = 'title';

      const searchedMovies = {
        [title]: movies,
      };

      const state: MovieStore.MovieState = {
        title: '',
        isLoading: true,
        errorMessage: 'error happened',
        detailedMovie,
        searchedMovies,
      };

      const action = MovieStore.reloadSearchedMovies({ title });

      const result = MovieStore.reducer(state, action);

      expect(result).toEqual({
        ...state,
        title,
        isLoading: false,
        errorMessage: undefined,
        detailedMovie: undefined,
      });
    });
  });
});
