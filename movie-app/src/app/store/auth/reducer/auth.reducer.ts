import { AuthAction, AuthActionTypes } from '../actions/auth.actions';
import { User } from 'src/app/models/user.model';

export interface AuthState {
  readonly user: User;
  readonly isLoading: boolean;
  readonly errorMessage: string | null;
}
const initialState: AuthState = {
  user: { email: '', password: '' },
  isLoading: false,
  errorMessage: null
};

export function AuthReducer(
  state = initialState,
  action: AuthAction
): AuthState {
  switch (action.type) {
    case AuthActionTypes.AUTH_SIGN_UP:
    case AuthActionTypes.AUTH_SIGN_IN:
      return {
        ...state,
        user: action.user,
        isLoading: true,
        errorMessage: null
      };
    case AuthActionTypes.AUTH_SIGN_UP_SUCCES:
    case AuthActionTypes.AUTH_SIGN_IN_SUCCES:
      return {
        ...state,
        isLoading: false
      };
    case AuthActionTypes.AUTH_SIGN_UP_FAIL:
    case AuthActionTypes.AUTH_SIGN_IN_FAIL:
      return {
        ...state,
        user: { email: '', password: '' },
        isLoading: false,
        errorMessage: action.error.message
      };
    case AuthActionTypes.AUTH_RESET:
      return initialState;
    default:
      return state;
  }
}
