import { Movie } from 'src/app/models/movie.model';
import * as MovieActions from '../actions/movie.actions';
import { DetailedMovie } from 'src/app/models/detailed-movie.model';
import { createReducer, on, Action } from '@ngrx/store';

export interface MovieState {
  readonly title: string;
  readonly isLoading: boolean;
  readonly errorMessage: string | undefined;
  readonly movies: Movie[];
  readonly detailedMovie: DetailedMovie | undefined;
}

export const initialState: MovieState = {
  title: '',
  isLoading: false,
  errorMessage: undefined,
  movies: [],
  detailedMovie: undefined
};

export function reducer(state: MovieState = initialState, action: Action) {
  return movieReducer(state, action);
}

const movieReducer = createReducer(
  initialState,
  on(MovieActions.reset, () => ({ ...initialState })),
  on(MovieActions.search, (state, { title }) => ({
    ...state,
    isLoading: true,
    errorMessage: undefined,
    movies: [],
    detailedMovie: undefined,
    title
  })),
  on(MovieActions.searchSuccess, (state, { movies }) => ({
    ...state,
    isLoading: false,
    movies
  })),
  on(MovieActions.searchFail, (state, { error }) => ({
    ...state,
    isLoading: false,
    errorMessage: error.message
  })),
  on(MovieActions.getDetailed, state => ({
    ...state,
    isLoading: true,
    errorMessage: undefined,
    detailedMovie: undefined
  })),
  on(MovieActions.getDetailedSuccess, (state, { detailedMovie }) => ({
    ...state,
    isLoading: false,
    detailedMovie
  })),
  on(MovieActions.getDetailedFail, (state, { error }) => ({
    ...state,
    isLoading: false,
    errorMessage: error.message
  }))
);
