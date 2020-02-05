import { Action } from '@ngrx/store';
import { Movie } from 'src/app/models/Movie';

export enum MovieActionTypes {
  SEARCH_MOVIES = '[MOVIE] Search movies',
  SEARCH_MOVIES_SUCCES = '[MOVIE] Search movies Success',
  SEARCH_MOVIES_FAIL = '[MOVIE] Search movies Fail',
}

export class SearchMoviesAction implements Action {
  readonly type = MovieActionTypes.SEARCH_MOVIES;
  constructor(public title: string) {}
}

export class SearchMoviesSuccessAction implements Action {
  readonly type = MovieActionTypes.SEARCH_MOVIES_SUCCES;
  constructor(public movies: Movie[]) {}
}

export class SearchMoviesFailAction implements Action {
  readonly type = MovieActionTypes.SEARCH_MOVIES_FAIL;
  constructor(public error: Error) {}
}

export type MovieAction = SearchMoviesAction
  | SearchMoviesSuccessAction
  | SearchMoviesFailAction;
