import { Action, createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';
import { User } from 'src/app/auth-module/models/user.model';

export interface AuthState {
  readonly user: User | undefined;
  readonly isLoading: boolean;
  readonly errorMessage: string | undefined;
}

const initialState: AuthState = {
  isLoading: false,
  errorMessage: undefined,
  user: undefined
};

export function reducer(state: AuthState | undefined, action: Action) {
  return authReducer(state, action);
}

const authReducer = createReducer(
  initialState,
  on(AuthActions.reset, AuthActions.signOutSuccess, () => ({
    ...initialState
  })),
  on(AuthActions.signUp, AuthActions.signIn, (state, { credentials }) => ({
    ...state,
    isLoading: true,
    errorMessage: undefined,
    credentials,
    user: undefined
  })),
  on(AuthActions.signUpSuccess, state => ({
    ...state,
    isLoading: false
  })),
  on(AuthActions.signInSuccess, (state, { user }) => ({
    ...state,
    isLoading: false,
    user
  })),
  on(AuthActions.signUpFail, AuthActions.signInFail, (state, { error }) => ({
    ...state,
    isLoading: false,
    credentials: { email: '', password: '' },
    errorMessage: error.message
  })),
  on(AuthActions.signOut, state => ({
    ...state,
    isLoading: true,
    errorMessage: undefined
  })),
  on(AuthActions.signOutFail, (state, { error }) => ({
    ...state,
    isLoading: false,
    errorMessage: error.message
  }))
);
