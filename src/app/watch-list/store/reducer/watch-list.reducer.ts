import { Action, createReducer, on } from '@ngrx/store';
import { WatchListDataDetailed } from '../../models/watch-list-data-detailed.model';
import * as WatchListActions from '../actions/watch-list.actions';

export type WatchListDataType = Record<string, WatchListDataDetailed>;

export interface WatchListState {
  readonly isLoading: boolean;
  readonly isUpdating: boolean;
  readonly errorMessage: string | undefined;
  readonly data: WatchListDataType;
}

export const initialState: WatchListState = {
  isLoading: false,
  isUpdating: false,
  errorMessage: undefined,
  data: {},
};

export function reducer(state: WatchListState = initialState, action: Action) {
  return watchListReducer(state, action);
}

const watchListReducer = createReducer(
  initialState,

  on(WatchListActions.reset, () => initialState),

  on(WatchListActions.load, (state) => ({
    ...state,
    isLoading: true,
    isUpdating: true,
    errorMessage: undefined,
    data: {},
  })),

  on(
    WatchListActions.addMovie,
    WatchListActions.updateMovie,
    WatchListActions.deleteMovie,
    (state) => ({
      ...state,
      isUpdating: true,
      errorMessage: undefined,
    })
  ),

  on(WatchListActions.loadSuccess, (state, { data }) => ({
    ...state,
    isLoading: false,
    isUpdating: false,
    errorMessage: undefined,
    data: { ...data },
  })),

  on(WatchListActions.addMovieSuccess, (state, { data }) => ({
    ...state,
    isUpdating: false,
    errorMessage: undefined,
    data: { ...state.data, ...{ [data.id]: data } },
  })),

  on(WatchListActions.updateMovieSuccess, (state, { data }) => {
    const id = data.id;
    const updatedData = { ...state.data[id], isFinished: data.isFinished };
    return {
      ...state,
      isUpdating: false,
      errorMessage: undefined,
      data: { ...state.data, ...{ [id]: updatedData } },
    };
  }),

  on(WatchListActions.deleteMovieSuccess, (state, { id }) => {
    const updatedData = { ...state.data };
    delete updatedData[id];

    return {
      ...state,
      isUpdating: false,
      errorMessage: undefined,
      data: { ...updatedData },
    };
  }),

  on(
    WatchListActions.addMovieFail,
    WatchListActions.updateMovieFail,
    WatchListActions.deleteMovieFail,
    (state, { error }) => ({
      ...state,
      isUpdating: false,
      errorMessage: error.message,
    })
  )
);
