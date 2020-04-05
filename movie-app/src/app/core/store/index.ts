import * as MovieStore from '../../movie/store/movie';
import * as AuthStore from '../../auth/store';
import * as WatchListStore from '../../watch-list/store';
import * as SnackBarStore from './snack-bar/';

export interface AppState {
  readonly movie: MovieStore.MovieState;
  readonly auth: AuthStore.AuthState;
  readonly watchList: WatchListStore.WatchListState;
}

export const reducers = {
  movie: MovieStore.reducer,
  auth: AuthStore.reducer,
  watchList: WatchListStore.reducer,
};

export const effects = [
  MovieStore.MovieEffects,
  AuthStore.AuthEffects,
  WatchListStore.WatchListEffects,
  SnackBarStore.SnackBarEffects,
];
