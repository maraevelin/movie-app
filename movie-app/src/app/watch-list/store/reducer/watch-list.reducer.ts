import { Action, createReducer, on } from '@ngrx/store';
import * as WatchListActions from '../actions/watch-list.actions';
import { WatchList2DataDetailed } from '../../models/watch-list-data-detailed.model';

export interface WatchListState {
  readonly isLoading: boolean;
  readonly errorMessage: string | undefined;
  readonly data: Record<string, WatchList2DataDetailed>;
}

export const initialState: WatchListState = {
  isLoading: false,
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
    errorMessage: undefined,
    data: {},
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
    data: { ...data },
  })),

  on(WatchListActions.addMovieSuccess, (state, { data }) => ({
    ...state,
    isLoading: false,
    errorMessage: undefined,
    data: { ...state.data, ...{ [data.id]: data } },
  })),

  on(WatchListActions.updateMovieSuccess, (state, { data }) => {
    const id = data.id;
    const updatedData = { ...state.data[id], isFinished: data.isFinished };
    return {
      ...state,
      isLoading: false,
      errorMessage: undefined,
      data: { ...state.data, ...{ [id]: updatedData } },
    };
  }),

  on(WatchListActions.deleteMovieSuccess, (state, { id }) => {
    const updatedData = { ...state.data };
    delete updatedData[id];

    return {
      ...state,
      isLoading: false,
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
      isLoading: false,
      errorMessage: error.message,
    })
  )
);
