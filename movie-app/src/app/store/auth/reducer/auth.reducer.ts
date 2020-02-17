import { User } from 'src/app/models/user.model';
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
  readonly user: User;
  readonly isLoading: boolean;
  readonly errorMessage: string | null;
}

const initialState: AuthState = {
  isSignedIn: false,
  user: { email: '', password: '' },
  isLoading: false,
  errorMessage: null
};

export function reducer(state: AuthState | undefined, action: Action) {
  return authReducer(state, action);
}

export const authReducer = createReducer(
  initialState,
  on(reset, _state => ({ ...initialState })),
  on(signUp, signIn, (state, { user }) => ({
    ...state,
    isSignedIn: false,
    isLoading: true,
    errorMessage: null,
    user
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
    user: { email: '', password: '' },
    errorMessage: error.message
  }))
);
