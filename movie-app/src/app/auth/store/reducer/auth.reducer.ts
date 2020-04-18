import { Action, createReducer, on } from '@ngrx/store';
import { User } from 'src/app/auth/models/user.model';
import * as AuthActions from '../../store/actions/auth.actions';

export interface AuthState {
  readonly user: User | undefined;
  readonly isLoading: boolean;
  readonly errorMessage: string | undefined;
}

export const initialState: AuthState = {
  isLoading: false,
  errorMessage: undefined,
  user: undefined,
};

export function reducer(state: AuthState | undefined, action: Action) {
  return authReducer(state, action);
}

const authReducer = createReducer(
  initialState,
  on(AuthActions.reset, AuthActions.signOutSuccess, () => ({
    ...initialState,
  })),
  on(
    AuthActions.signUp,
    AuthActions.signIn,
    AuthActions.forgotPassword,
    (state) => ({
      ...state,
      isLoading: true,
      errorMessage: undefined,
      user: undefined,
    })
  ),
  on(AuthActions.signUpSuccess, AuthActions.forgotPasswordSuccess, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(AuthActions.signInSuccess, (state, { user }) => ({
    ...state,
    isLoading: false,
    user,
  })),
  on(
    AuthActions.signUpFail,
    AuthActions.signInFail,
    AuthActions.signOutFail,
    AuthActions.forgotPasswordFail,
    (state, { error }) => ({
      ...state,
      isLoading: false,
      errorMessage: error.message,
    })
  ),
  on(AuthActions.signOut, (state) => ({
    ...state,
    isLoading: true,
    errorMessage: undefined,
  }))
);
