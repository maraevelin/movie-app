import { AppState } from 'src/app/core/store';
import { createSelector } from '@ngrx/store';
import * as WatchListStore from '../';

export const selectWatchList = (state: AppState) => state.watchList;

export const selectIsLoading = createSelector(
  selectWatchList,
  (state: WatchListStore.WatchListState) => state.isLoading
);

export const selectIsUpdating = createSelector(
  selectWatchList,
  (state: WatchListStore.WatchListState) => state.isUpdating
);

export const selectErrorMessage = createSelector(
  selectWatchList,
  (state: WatchListStore.WatchListState) => state.errorMessage
);

export const selectData = createSelector(
  selectWatchList,
  (state: WatchListStore.WatchListState) => state.data
);

export const selectDataAsArray = createSelector(
  selectWatchList,
  (state: WatchListStore.WatchListState) => Object.values(state.data)
);

export const selectIsEmpty = createSelector(
  selectWatchList,
  (state: WatchListStore.WatchListState) => !state.isLoading && !Object.keys(state.data).length
);

export const selectIsPopulated = createSelector(
  selectWatchList,
  (state: WatchListStore.WatchListState) => !state.isLoading && Object.keys(state.data).length > 0
);