import { createSelector } from '@ngrx/store';
import { AuthState } from '../reducer/auth.reducer';
import { AppState } from 'src/app/core/store';

export const selectAuth = (state: AppState) => state.auth;

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