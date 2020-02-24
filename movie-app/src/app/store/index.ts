import * as MovieStore from './movie/reducer/movie.reducer';
import { MovieEffects } from './movie/effects/movie.effects';
import * as AuthStore from '../auth-module/store/auth/reducer/auth.reducer';
import { AuthEffects } from '../auth-module/store/auth/effects/auth.effects';

export interface AppState {
  readonly movie: MovieStore.MovieState;
  readonly auth: AuthStore.AuthState;
}

export const reducers = {
  movie: MovieStore.reducer,
  auth: AuthStore.reducer
};

export const effects = [MovieEffects, AuthEffects];
