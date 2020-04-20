import * as MovieStore from '../../movie/store/movie';
import * as AuthStore from '../../auth/store/auth';
import * as WatchListStore from '../../watch-list/store';
import * as SnackBarStore from './snack-bar/';
import * as ResetPasswordStore from '../../auth/store/reset-password';

export interface AppState {
  readonly movie: MovieStore.MovieState;
  readonly auth: AuthStore.AuthState;
  readonly watchList: WatchListStore.WatchListState;
  readonly resetPassword: ResetPasswordStore.ResetPasswordState;
}

export const reducers = {
  movie: MovieStore.reducer,
  auth: AuthStore.reducer,
  watchList: WatchListStore.reducer,
  resetPassword: ResetPasswordStore.reducer,
};

export const effects = [
  MovieStore.MovieEffects,
  AuthStore.AuthEffects,
  WatchListStore.WatchListEffects,
  SnackBarStore.SnackBarEffects,
  ResetPasswordStore.ResetPasswordEffects,
];
