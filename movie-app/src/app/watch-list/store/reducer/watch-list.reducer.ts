import { Action, createReducer, on } from '@ngrx/store';
import * as WatchListActions from '../actions/watch-list.actions';

export interface WatchList2Data {
  id: string;
  isFinished: boolean;
}

export interface WatchListState {
  readonly isLoading: boolean;
  readonly errorMessage: string | undefined;
  readonly data: WatchList2Data[];
}

export const initialState: WatchListState = {
  isLoading: false,
  errorMessage: undefined,
  data: [],
};

export function reducer(state: WatchListState = initialState, action: Action) {
  return watchListReducer(state, action);
}

const watchListReducer = createReducer(
  initialState,
  on(WatchListActions.load, (state) => ({
    ...state,
    isLoading: true,
    errorMessage: undefined,
    datas: undefined,
  })),
  on(
    WatchListActions.addMovie,
    WatchListActions.updateMovie,
    WatchListActions.deleteMovie,
    (state) => ({
      ...state,
      isLoading: true,
      errorMessage: undefined,
    })
  ),

  on(WatchListActions.loadSuccess, (state, { data }) => ({
    ...state,
    isLoading: false,
    errorMessage: undefined,
    data: (data && [data]) || [],
  })),
  on(
    WatchListActions.addMovieSuccess,
    WatchListActions.updateMovieSuccess,
    (state, { data }) => ({
      ...state,
      isLoading: false,
      errorMessage: undefined,
      data: (data && [...state.data, ...[data]]) || state.data,
    })
  ),
  on(WatchListActions.deleteMovieSuccess, (state) => ({
    ...state,
    isLoading: false,
    errorMessage: undefined,
    datas: undefined,
  })),

  on(
    WatchListActions.addMovieFail,
    WatchListActions.updateMovieFail,
    WatchListActions.deleteMovieFail,
    (state, { error }) => ({
      ...state,
      isLoading: false,
      errorMessage: error.message,
    })
  )
);
