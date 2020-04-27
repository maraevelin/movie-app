import { createReducer, on, Action } from '@ngrx/store';
import { DetailedMovie } from 'src/app/movie/models/detailed-movie.model';
import { Movie } from 'src/app/movie/models/movie.model';
import * as MovieActions from '../actions/movie.actions';

export type SearchedMoviesType = Record<string, Movie[]>;

export interface MovieState {
  readonly title: string;
  readonly isLoading: boolean;
  readonly errorMessage: string | undefined;
  readonly detailedMovie: DetailedMovie | undefined;
  readonly searchedMovies: SearchedMoviesType;
}

export const initialState: MovieState = {
  title: '',
  isLoading: false,
  errorMessage: undefined,
  detailedMovie: undefined,
  searchedMovies: {},
};

export function reducer(state: MovieState = initialState, action: Action) {
  return movieReducer(state, action);
}

const movieReducer = createReducer(
  initialState,
  on(MovieActions.reset, (state) => ({
    ...initialState,
    searchedMovies: state.searchedMovies,
  })),
  on(MovieActions.search, (state, { title }) => ({
    ...state,
    isLoading: true,
    errorMessage: undefined,
    detailedMovie: undefined,
    title: title.toLowerCase(),
  })),
  on(MovieActions.searchSuccess, (state, { movies }) => ({
    ...state,
    isLoading: false,
    searchedMovies: {
      ...state.searchedMovies,
      ...{ [state.title.toLowerCase()]: movies },
    },
  })),
  on(
    MovieActions.searchFail,
    MovieActions.getDetailedFail,
    (state, { error }) => ({
      ...state,
      isLoading: false,
      errorMessage: error.message,
    })
  ),
  on(MovieActions.getDetailed, (state) => ({
    ...state,
    isLoading: true,
    errorMessage: undefined,
    detailedMovie: undefined,
  })),
  on(MovieActions.getDetailedSuccess, (state, { detailedMovie }) => ({
    ...state,
    isLoading: false,
    detailedMovie,
  })),
  on(MovieActions.reloadSearchedMovies, (state, { title }) => ({
    ...state,
    title: title.toLowerCase(),
    isLoading: false,
    errorMessage: undefined,
    detailedMovie: undefined,
  }))
);
