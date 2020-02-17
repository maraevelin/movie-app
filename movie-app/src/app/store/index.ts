import { MovieState, movieReducer } from './movie/reducer/movie.reducer';
import { AuthState, AuthReducer } from './auth/reducer/auth.reducer';
import { MovieEffects } from './movie/effects/movie.effects';
import { AuthEffects } from './auth/effects/auth.effects';

export interface AppState {
  readonly movie: MovieState;
  readonly auth: AuthState;
}

export const reducers = {
  movie: movieReducer,
  auth: AuthReducer
};

export const effects = [MovieEffects, AuthEffects];
