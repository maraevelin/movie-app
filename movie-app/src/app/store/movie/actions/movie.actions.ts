import { Action } from '@ngrx/store';
import { Movie } from 'src/app/models/Movie';
import { DetailedMovie } from 'src/app/models/DetailedMovie';

export enum MovieActionTypes {
  SEARCH_MOVIES = '[MOVIE] Search movies',
  SEARCH_MOVIES_SUCCES = '[MOVIE] Search movies Success',
  SEARCH_MOVIES_FAIL = '[MOVIE] Search movies Fail',

  GET_DETAILED_MOVIE = '[MOVI] Get detailed movie',
  GET_DETAILED_MOVIE_SUCCES = '[MOVI] Get detailed movie Success',
  GET_DETAILED_MOVIE_FAIL = '[MOVI] Get detailed movie Fail',
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

export class GetDetailedMovieAction implements Action {
  readonly type = MovieActionTypes.GET_DETAILED_MOVIE;
  constructor(public id: string) {}
}

export class GetDetailedMovieSuccessAction implements Action {
  readonly type = MovieActionTypes.GET_DETAILED_MOVIE_SUCCES;
  constructor(public detailedMovie: DetailedMovie) {}
}

export class GetDetailedMovieFailAction implements Action {
  readonly type = MovieActionTypes.GET_DETAILED_MOVIE_FAIL;
  constructor(public error: Error) {}
}

export type MovieAction = SearchMoviesAction
  | SearchMoviesSuccessAction
  | SearchMoviesFailAction
  | GetDetailedMovieAction
  | GetDetailedMovieSuccessAction
  | GetDetailedMovieFailAction;
