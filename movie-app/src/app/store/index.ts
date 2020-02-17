import { MovieState, movieReducer } from './movie/reducer/movie.reducer';
import { AuthState, authReducer } from './auth/reducer/auth.reducer';
import { MovieEffects } from './movie/effects/movie.effects';
import { AuthEffects } from './auth/effects/auth.effects';

export interface AppState {
  readonly movie: MovieState;
  readonly auth: AuthState;
}

export const reducers = {
  movie: movieReducer,
  auth: authReducer
};

export const effects = [MovieEffects, AuthEffects];
