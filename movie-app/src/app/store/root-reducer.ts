import { MovieState } from './movie/reducer/movie.reducer';
import { AuthState } from './movie/reducer/auth.reducer';

export interface AppState {
  readonly movie: MovieState;
  readonly auth: AuthState;
}
