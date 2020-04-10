import { AppState } from 'src/app/core/store';
import { createSelector } from '@ngrx/store';
import * as WatchListStore from '../';
import { WatchListDataDetailed } from '../../models/watch-list-data-detailed.model';

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
  (state: WatchListStore.WatchListState) => {
    return Object.values(state.data).reduce(
      (datas: WatchListDataDetailed[], data) => {
        datas.push(data);
        return datas;
      },
      []
    );
  }
);
