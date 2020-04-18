import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/core/store';
import * as AuthStore from '../';

export const selectAuth = (state: AppState) => state.auth;

export const selectIsLoading = createSelector(
  selectAuth,
  (state: AuthStore.AuthState) => state.isLoading
);

export const selectErrorMessage = createSelector(
  selectAuth,
  (state: AuthStore.AuthState) => state.errorMessage
);

export const selectUser = createSelector(
  selectAuth,
  (state: AuthStore.AuthState) => state.user
);

export const selectUserId = createSelector(
  selectAuth,
  (state: AuthStore.AuthState) => (state.user ? state.user.id : undefined)
);
