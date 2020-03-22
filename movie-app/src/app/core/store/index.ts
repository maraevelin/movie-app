import * as MovieStore from './movie/';
import * as AuthStore from '../../auth/store';
import * as SnackBarStore from './snack-bar/';

export interface AppState {
  readonly movie: MovieStore.MovieState;
  readonly auth: AuthStore.AuthState;
}

export const reducers = {
  movie: MovieStore.reducer,
  auth: AuthStore.reducer
};

export const effects = [
  MovieStore.MovieEffects,
  AuthStore.AuthEffects,
  SnackBarStore.SnackBarEffects
];
