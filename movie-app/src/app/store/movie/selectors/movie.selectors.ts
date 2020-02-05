import { AppState } from '../../root-reducer';
import { createSelector } from '@ngrx/store';
import { MovieState } from '../reducer/movie.reducer';

export const selectMovie = (state: AppState) => state.movie;

export const selectTitle = createSelector(
  selectMovie,
  (state: MovieState) => state.title
);

export const selectIsLoading = createSelector(
  selectMovie,
  (state: MovieState) => state.isLoading
);

export const selectMovies = createSelector(
  selectMovie,
  (state: MovieState) => state.movies
);

export const selectErrorMessage = createSelector(
  selectMovie,
  (state: MovieState) => state.errorMessage
);
