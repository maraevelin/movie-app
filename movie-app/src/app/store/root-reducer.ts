import { MovieState } from './movie/reducer/movie.reducer';

export interface AppState {
  readonly movie: MovieState;
}
