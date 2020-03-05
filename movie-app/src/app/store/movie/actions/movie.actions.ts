import { createAction, props } from '@ngrx/store';
import { Movie } from 'src/app/models/movie.model';
import { DetailedMovie } from 'src/app/models/detailed-movie.model';

export enum MovieActionTypes {
  MOVIE_RESET = '[MOVIE] Reset',

  MOVIE_SEARCH = '[MOVIE] Search',
  MOVIE_SEARCH_SUCCESS = '[MOVIE] Search Success',
  MOVIE_SEARCH_FAIL = '[MOVIE] Search Fail',

  MOVIE_GET_DETAILED = '[MOVIE] Get detailed',
  MOVIE_GET_DETAILED_SUCCES = '[MOVIE] Get detailed Success',
  MOVIE_GET_DETAILED_FAIL = '[MOVIE] Get detailed Fail'
}

export const reset = createAction(MovieActionTypes.MOVIE_RESET);

export const search = createAction(
  MovieActionTypes.MOVIE_SEARCH,
  props<{ title: string }>()
);

export const searchSuccess = createAction(
  MovieActionTypes.MOVIE_SEARCH_SUCCESS,
  props<{ movies: Movie[] }>()
);

export const searchFail = createAction(
  MovieActionTypes.MOVIE_SEARCH_FAIL,
  props<{ error: Error }>()
);

export const getDetailed = createAction(
  MovieActionTypes.MOVIE_GET_DETAILED,
  props<{ id: string }>()
);

export const getDetailedSuccess = createAction(
  MovieActionTypes.MOVIE_GET_DETAILED_SUCCES,
  props<{ detailedMovie: DetailedMovie }>()
);

export const getDetailedFail = createAction(
  MovieActionTypes.MOVIE_GET_DETAILED_FAIL,
  props<{ error: Error }>()
);
