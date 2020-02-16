import { Action } from '@ngrx/store';
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

export class ResetAction implements Action {
  readonly type = MovieActionTypes.MOVIE_RESET;
}

export class SearchAction implements Action {
  readonly type = MovieActionTypes.MOVIE_SEARCH;
  constructor(public payload: { title: string }) {}
}

export class SearchSuccessAction implements Action {
  readonly type = MovieActionTypes.MOVIE_SEARCH_SUCCESS;
  constructor(public payload: { movies: Movie[] }) {}
}

export class SearchFailAction implements Action {
  readonly type = MovieActionTypes.MOVIE_SEARCH_FAIL;
  constructor(public payload: { error: Error }) {}
}

export class GetDetailedAction implements Action {
  readonly type = MovieActionTypes.MOVIE_GET_DETAILED;
  constructor(public payload: { id: string }) {}
}

export class GetDetailedSuccessAction implements Action {
  readonly type = MovieActionTypes.MOVIE_GET_DETAILED_SUCCES;
  constructor(public payload: { detailedMovie: DetailedMovie }) {}
}

export class GetDetailedFailAction implements Action {
  readonly type = MovieActionTypes.MOVIE_GET_DETAILED_FAIL;
  constructor(public payload: { error: Error }) {}
}

export type MovieAction =
  | ResetAction
  | SearchAction
  | SearchSuccessAction
  | SearchFailAction
  | GetDetailedAction
  | GetDetailedSuccessAction
  | GetDetailedFailAction;
