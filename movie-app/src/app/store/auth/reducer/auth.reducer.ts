import { Credentials } from 'src/app/models/credentials.model';
import { Action, createReducer, on } from '@ngrx/store';
import {
  reset,
  signUp,
  signUpSuccess,
  signUpFail,
  signIn,
  signInSuccess,
  signInFail,
  signOut,
  signOutFail,
  signOutSuccess
} from '../actions/auth.actions';
import { User } from 'src/app/models/user.model';

export interface AuthState {
  readonly credentials: Credentials;
  readonly user: User | null;
  readonly isLoading: boolean;
  readonly errorMessage: string | null;
}

const initialState: AuthState = {
  credentials: { email: '', password: '' },
  isLoading: false,
  errorMessage: null,
  user: null
};

export function reducer(state: AuthState | undefined, action: Action) {
  return authReducer(state, action);
}

const authReducer = createReducer(
  initialState,
  on(reset, signOutSuccess, () => ({ ...initialState })),
  on(signUp, signIn, (state, { credentials }) => ({
    ...state,
    isLoading: true,
    errorMessage: null,
    credentials,
    user: null
  })),
  on(signUpSuccess, state => ({
    ...state,
    isLoading: false
  })),
  on(signInSuccess, (state, { user }) => ({
    ...state,
    isLoading: false,
    user
  })),
  on(signUpFail, signInFail, (state, { error }) => ({
    ...state,
    isLoading: false,
    credentials: { email: '', password: '' },
    errorMessage: error.message
  })),
  on(signOut, state => ({
    ...state,
    isLoading: true,
    errorMessage: null
  })),
  on(signOutFail, (state, { error }) => ({
    ...state,
    isLoading: false,
    errorMessage: error.message
  }))
);
