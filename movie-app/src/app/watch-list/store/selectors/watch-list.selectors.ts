import { AppState } from 'src/app/core/store';
import { createSelector } from '@ngrx/store';
import * as WatchListStore from '../';
import { WatchList2Data } from '../reducer/watch-list.reducer';

export const selectWatchList = (state: AppState) => state.watchList;

export const selectIsLoading = createSelector(
  selectWatchList,
  (state: WatchListStore.WatchListState) => state.isLoading
);
export const selectErrorMessage = createSelector(
  selectWatchList,
  (state: WatchListStore.WatchListState) => state.errorMessage
);
export const selectData = createSelector(
  selectWatchList,
  (state: WatchListStore.WatchListState) => {
    return Object.values(state.data).reduce((datas: WatchList2Data[], data) => {
      datas.push(data);
      return datas;
    }, []);
  }
);
