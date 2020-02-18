import { AppState } from '../..';
import { createSelector } from '@ngrx/store';
import { AuthState } from '../reducer/auth.reducer';

export const selectAuth = (state: AppState) => state.auth;

export const selectCredentials = createSelector(
  selectAuth,
  (state: AuthState) => state.credentials
);

export const selectIsLoading = createSelector(
  selectAuth,
  (state: AuthState) => state.isLoading
);

export const selectErrorMessage = createSelector(
  selectAuth,
  (state: AuthState) => state.errorMessage
);

export const selectUser = createSelector(
  selectAuth,
  (state: AuthState) => state.user
);
