import { AuthAction, AuthActionTypes } from '../actions/auth.actions';

export interface AuthState {
  readonly email: string;
  readonly isLoading: boolean;
  readonly errorMessage: string | null;
}

const initialState: AuthState = {
  email: '',
  isLoading: false,
  errorMessage: null
};

export function AuthReducer(
  state = initialState,
  action: AuthAction
): AuthState {
  switch (action.type) {
    case AuthActionTypes.AUTH_RESET:
      return initialState;

    case AuthActionTypes.AUTH_SIGN_UP:
      return {
        ...state,
        email: action.email,
        isLoading: true,
        errorMessage: null
      };
    case AuthActionTypes.AUTH_SIGN_UP_SUCCES:
      return {
        ...state,
        isLoading: false
      };
    case AuthActionTypes.AUTH_SIGN_UP_FAIL:
      return {
        ...state,
        email: '',
        isLoading: false,
        errorMessage: action.error.message
      };
    case AuthActionTypes.AUTH_SIGN_IN:
      return {
        ...state,
        email: action.email,
        isLoading: true,
        errorMessage: null
      };
    case AuthActionTypes.AUTH_SIGN_IN_SUCCES:
      return {
        ...state,
        isLoading: false
      };
    case AuthActionTypes.AUTH_SIGN_IN_FAIL:
      return {
        ...state,
        email: '',
        isLoading: false,
        errorMessage: action.error.message
      };
    default:
      return state;
  }
}
