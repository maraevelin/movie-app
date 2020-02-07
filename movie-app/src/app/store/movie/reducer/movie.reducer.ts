import { Movie } from 'src/app/models/Movie';
import { MovieAction, MovieActionTypes } from '../actions/movie.actions';
import { DetailedMovie } from 'src/app/models/DetailedMovie';

export interface MovieState {
  readonly title: string;
  readonly isLoading: boolean;
  readonly errorMessage: string | null;
  readonly movies: Movie[];
  readonly detailedMovie: DetailedMovie | null;
}

const initialState: MovieState = {
  title: '',
  isLoading: false,
  errorMessage: null,
  movies: [],
  detailedMovie: null,
};

export function MovieReducer(
  state = initialState,
  action: MovieAction
): MovieState {
  switch (action.type) {
    case MovieActionTypes.SEARCH_MOVIES:
      return {
        ...state,
        title: action.title,
        isLoading: true,
        errorMessage: null,
        movies: [],
        detailedMovie: null,
      };
    case MovieActionTypes.SEARCH_MOVIES_SUCCES:
      return {
        ...state,
        isLoading: false,
        errorMessage: null,
        movies: action.movies,
        detailedMovie: null,
      };
    case MovieActionTypes.SEARCH_MOVIES_FAIL:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.error.message,
        movies: [],
        detailedMovie: null
      };
    case MovieActionTypes.GET_DETAILED_MOVIE:
      return {
        ...state,
        isLoading: true,
        errorMessage: null,
        detailedMovie: null,
      };
    case MovieActionTypes.GET_DETAILED_MOVIE_SUCCES:
      return {
        ...state,
        isLoading: false,
        errorMessage: null,
        detailedMovie: action.detailedMovie,
      };
    case MovieActionTypes.GET_DETAILED_MOVIE_FAIL:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.error.message,
        movies: [],
        detailedMovie: null
      };
    case MovieActionTypes.RESET:
      return initialState;
    default:
      return state;
  }
}
