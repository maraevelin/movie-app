import { Action, createAction } from '@ngrx/store';
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

export class SearchAction implements Action {
  readonly type = MovieActionTypes.MOVIE_SEARCH;
  readonly payload: { title: string };

  constructor(title: string) {
    this.payload = { title };
  }
}

export class SearchSuccessAction implements Action {
  readonly type = MovieActionTypes.MOVIE_SEARCH_SUCCESS;
  readonly payload: { movies: Movie[] };

  constructor(movies: Movie[]) {
    this.payload = { movies };
  }
}

export class SearchFailAction implements Action {
  readonly type = MovieActionTypes.MOVIE_SEARCH_FAIL;
  readonly payload: { error: Error };

  constructor(error: Error) {
    this.payload = { error };
  }
}

export class GetDetailedAction implements Action {
  readonly type = MovieActionTypes.MOVIE_GET_DETAILED;
  readonly payload: { id: string };

  constructor(id: string) {
    this.payload = { id };
  }
}

export class GetDetailedSuccessAction implements Action {
  readonly type = MovieActionTypes.MOVIE_GET_DETAILED_SUCCES;
  readonly payload: { detailedMovie: DetailedMovie };

  constructor(detailedMovie: DetailedMovie) {
    this.payload = { detailedMovie };
  }
}

export class GetDetailedFailAction implements Action {
  readonly type = MovieActionTypes.MOVIE_GET_DETAILED_FAIL;
  readonly payload: { error: Error };

  constructor(error: Error) {
    this.payload = { error };
  }
}

export type MovieAction =
  | SearchAction
  | SearchSuccessAction
  | SearchFailAction
  | GetDetailedAction
  | GetDetailedSuccessAction
  | GetDetailedFailAction;
