import * as MovieStore from './movie/reducer/movie.reducer';
import * as AuthStore from './auth/reducer/auth.reducer';
import { MovieEffects } from './movie/effects/movie.effects';
import { AuthEffects } from './auth/effects/auth.effects';

export interface AppState {
  readonly movie: MovieStore.MovieState;
  readonly auth: AuthStore.AuthState;
}

export const reducers = {
  movie: MovieStore.reducer,
  auth: AuthStore.reducer
};

export const effects = [MovieEffects, AuthEffects];
