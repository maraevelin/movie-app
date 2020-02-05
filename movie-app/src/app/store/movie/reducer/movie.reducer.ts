import { Movie } from 'src/app/models/Movie';
import { MovieAction, MovieActionTypes } from '../actions/movie.actions';

export interface MovieState {
  readonly title: string;
  readonly movies: Movie[];
  readonly isLoading: boolean;
  readonly errorMessage: string | null;
}

const initialState: MovieState = {
  title: '',
  movies: [],
  isLoading: false,
  errorMessage: null,
};

export function MovieReducer(
  state = initialState,
  action: MovieAction
): MovieState {
  switch (action.type) {
    case MovieActionTypes.SEARCH_MOVIES:
      return { ...state, title: action.title, isLoading: true };
    case MovieActionTypes.SEARCH_MOVIES_SUCCES:
      return {...state, movies: action.movies, isLoading: false};
    case MovieActionTypes.SEARCH_MOVIES_FAIL:
      return {...state,  movies: [], errorMessage: action.error.message, isLoading: false};
    default:
      return state;
  }
}
