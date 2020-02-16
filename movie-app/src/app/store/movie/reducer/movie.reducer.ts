import { Movie } from 'src/app/models/movie.model';
import { MovieAction, MovieActionTypes } from '../actions/movie.actions';
import { DetailedMovie } from 'src/app/models/detailed-movie.model';

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
  detailedMovie: null
};

export function MovieReducer(
  state = initialState,
  action: MovieAction
): MovieState {
  switch (action.type) {
    case MovieActionTypes.MOVIE_SEARCH:
      return {
        ...state,
        title: action.title,
        isLoading: true,
        errorMessage: null,
        movies: [],
        detailedMovie: null
      };
    case MovieActionTypes.MOVIE_SEARCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        movies: action.movies
      };
    case MovieActionTypes.MOVIE_SEARCH_FAIL:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.error.message
      };
    case MovieActionTypes.MOVIE_GET_DETAILED:
      return {
        ...state,
        isLoading: true,
        errorMessage: null,
        detailedMovie: null
      };
    case MovieActionTypes.MOVIE_GET_DETAILED_SUCCES:
      return {
        ...state,
        isLoading: false,
        detailedMovie: action.detailedMovie
      };
    case MovieActionTypes.MOVIE_GET_DETAILED_FAIL:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.error.message
      };
    case MovieActionTypes.MOVIE_RESET:
      return initialState;
    default:
      return state;
  }
}
