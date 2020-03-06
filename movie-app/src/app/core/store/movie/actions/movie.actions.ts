import { createAction, props } from '@ngrx/store';
import { Movie } from 'src/app/core/models/movie.model';
import { DetailedMovie } from 'src/app/core/models/detailed-movie.model';

export const reset = createAction('[MOVIE] Reset');

export const search = createAction(
  '[MOVIE] Search',
  props<{ title: string }>()
);

export const searchSuccess = createAction(
  '[MOVIE] Search Success',
  props<{ movies: Movie[] }>()
);

export const searchFail = createAction(
  '[MOVIE] Search Fail',
  props<{ error: Error }>()
);

export const getDetailed = createAction(
  '[MOVIE] Get detailed',
  props<{ id: string }>()
);

export const getDetailedSuccess = createAction(
  '[MOVIE] Get detailed Success',
  props<{ detailedMovie: DetailedMovie }>()
);

export const getDetailedFail = createAction(
  '[MOVIE] Get detailed Fail',
  props<{ error: Error }>()
);
