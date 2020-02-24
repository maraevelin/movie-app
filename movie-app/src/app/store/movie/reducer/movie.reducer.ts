import { Movie } from 'src/app/models/movie.model';
import {
  reset,
  search,
  searchSuccess,
  getDetailed,
  searchFail,
  getDetailedSuccess,
  getDetailedFail
} from '../actions/movie.actions';
import { DetailedMovie } from 'src/app/models/detailed-movie.model';
import { createReducer, on, Action } from '@ngrx/store';

export interface MovieState {
  readonly title: string;
  readonly isLoading: boolean;
  readonly errorMessage: string | undefined;
  readonly movies: Movie[];
  readonly detailedMovie: DetailedMovie | undefined;
}

const initialState: MovieState = {
  title: '',
  isLoading: false,
  errorMessage: undefined,
  movies: [],
  detailedMovie: undefined
};

export function reducer(state: MovieState | undefined, action: Action) {
  return movieReducer(state, action);
}

const movieReducer = createReducer(
  initialState,
  on(reset, () => ({ ...initialState })),
  on(search, (state, { title }) => ({
    ...state,
    isLoading: true,
    errorMessage: undefined,
    movies: [],
    detailedMovie: undefined,
    title
  })),
  on(searchSuccess, (state, { movies }) => ({
    ...state,
    isLoading: false,
    movies
  })),
  on(searchFail, (state, { error }) => ({
    ...state,
    isLoading: false,
    errorMessage: error.message
  })),
  on(getDetailed, state => ({
    ...state,
    isLoading: true,
    errorMessage: undefined,
    detailedMovie: undefined
  })),
  on(getDetailedSuccess, (state, { detailedMovie }) => ({
    ...state,
    isLoading: false,
    detailedMovie
  })),
  on(getDetailedFail, (state, { error }) => ({
    ...state,
    isLoading: false,
    errorMessage: error.message
  }))
);
