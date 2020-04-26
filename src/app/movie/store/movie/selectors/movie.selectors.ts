import { AppState } from '../../../../core/store';
import { createSelector } from '@ngrx/store';
import * as MovieStore from '../';

export const selectMovie = (state: AppState) => state.movie;

export const selectTitle = createSelector(
  selectMovie,
  (state: MovieStore.MovieState) => state.title
);

export const selectIsLoading = createSelector(
  selectMovie,
  (state: MovieStore.MovieState) => state.isLoading
);

export const selectMovies = createSelector(
  selectMovie,
  (state: MovieStore.MovieState) => state.movies
);

export const selectErrorMessage = createSelector(
  selectMovie,
  (state: MovieStore.MovieState) => state.errorMessage
);

export const selectDetailedMovie = createSelector(
  selectMovie,
  (state: MovieStore.MovieState) => state.detailedMovie
);

export const selectSearchedMovie = createSelector(
  selectMovie,
  (state: MovieStore.MovieState, title: string) => state.searchedMovies[title.toLowerCase()]
);
