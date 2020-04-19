import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/core/store';
import * as AuthStore from '../';

export const selectResetPassword = (state: AppState) => state.resetPassword;

export const selectIsLoading = createSelector(
  selectResetPassword,
  (state: AuthStore.ResetPasswordState) => state.isLoading
);

export const selectErrorMessage = createSelector(
  selectResetPassword,
  (state: AuthStore.ResetPasswordState) => state.errorMessage
);

export const selectIsVerified = createSelector(
  selectResetPassword,
  (state: AuthStore.ResetPasswordState) => state.isVerified
);

export const selectIsConfirmed = createSelector(
  selectResetPassword,
  (state: AuthStore.ResetPasswordState) => state.isConfirmed
);
