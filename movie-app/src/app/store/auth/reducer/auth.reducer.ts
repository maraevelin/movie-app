import { Credentials } from 'src/app/models/credentials.model';
import { Action, createReducer, on } from '@ngrx/store';
import {
  reset,
  signUp,
  signUpSuccess,
  signUpFail,
  signIn,
  signInSuccess,
  signInFail
} from '../actions/auth.actions';

export interface AuthState {
  readonly isSignedIn: boolean;
  readonly credentials: Credentials;
  readonly isLoading: boolean;
  readonly errorMessage: string | null;
}

const initialState: AuthState = {
  isSignedIn: false,
  credentials: { email: '', password: '' },
  isLoading: false,
  errorMessage: null
};

export function reducer(state: AuthState | undefined, action: Action) {
  return authReducer(state, action);
}

export const authReducer = createReducer(
  initialState,
  on(reset, _state => ({ ...initialState })),
  on(signUp, signIn, (state, { credentials }) => ({
    ...state,
    isSignedIn: false,
    isLoading: true,
    errorMessage: null,
    credentials
  })),
  on(signUpSuccess, state => ({
    ...state,
    isLoading: false
  })),
  on(signInSuccess, state => ({
    ...state,
    isSignedIn: true,
    isLoading: false
  })),
  on(signUpFail, signInFail, (state, { error }) => ({
    ...state,
    isLoading: false,
    credentials: { email: '', password: '' },
    errorMessage: error.message
  }))
);
