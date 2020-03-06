import * as MovieStore from './movie/reducer/movie.reducer';
import { MovieEffects } from './movie/effects/movie.effects';
import * as AuthStore from '../../auth/store';

export interface AppState {
  readonly movie: MovieStore.MovieState;
  readonly auth: AuthStore.AuthState;
}

export const reducers = {
  movie: MovieStore.reducer,
  auth: AuthStore.reducer
};

export const effects = [MovieEffects, AuthStore.AuthEffects];
