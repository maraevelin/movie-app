import { Action, createReducer, on } from '@ngrx/store';
import * as ResetActions from '../actions/reset-password.actions';

export interface ResetPasswordState {
  readonly isLoading: boolean;
  readonly errorMessage: string | undefined;
  readonly isVerified: boolean | undefined;
  readonly isConfirmed: boolean | undefined;
}

export const initialState: ResetPasswordState = {
  isLoading: false,
  errorMessage: undefined,
  isVerified: undefined,
  isConfirmed: undefined,
};

export function reducer(state: ResetPasswordState | undefined, action: Action) {
  return resetPasswordReducer(state, action);
}

const resetPasswordReducer = createReducer(
  initialState,

  on(ResetActions.reset, ResetActions.requestResetLinkSuccess, () => ({
    ...initialState,
  })),

  on(ResetActions.requestResetLink, ResetActions.verify, (state) => ({
    ...state,
    isLoading: true,
    errorMessage: undefined,
    isVerified: undefined,
    isConfirmed: undefined,
  })),

  on(ResetActions.requestResetLinkFail, (state, { error }) => ({
    ...state,
    isLoading: false,
    errorMessage: error.message,
    isVerified: undefined,
    isConfirmed: undefined,
  })),

  on(ResetActions.verifySuccess, (state) => ({
    ...state,
    isLoading: false,
    errorMessage: undefined,
    isVerified: true,
    isConfirmed: undefined,
  })),

  on(ResetActions.verifyFail, (state, { error }) => ({
    ...state,
    isLoading: false,
    errorMessage: error.message,
    isVerified: false,
    isConfirmed: undefined,
  })),

  on(ResetActions.confirm, (state) => ({
    ...state,
    isLoading: true,
    errorMessage: undefined,
    isConfirmed: true,
  })),

  on(ResetActions.confirmSuccess, (state) => ({
    ...state,
    isLoading: false,
    errorMessage: undefined,
    isConfirmed: true,
  })),

  on(ResetActions.confirmFail, (state, { error }) => ({
    ...state,
    isLoading: false,
    errorMessage: error.message,
    isConfirmed: false,
  }))
);
