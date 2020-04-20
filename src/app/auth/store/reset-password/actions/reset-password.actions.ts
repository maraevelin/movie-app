import { createAction, props } from '@ngrx/store';
import { ConfirmResetPasswordModel } from 'src/app/auth/services/models/confirm-reset-password.model';

export const reset = createAction('[RESET PASSWORD] Reset');

export const requestResetLink = createAction(
  '[RESET PASSWORD] Request reset password link',
  props<{ email: string }>()
);

export const requestResetLinkSuccess = createAction(
  '[RESET PASSWORD] Request reset password link Success'
);

export const requestResetLinkFail = createAction(
  '[RESET PASSWORD] Request reset password link Fail',
  props<{ error: Error }>()
);

export const verify = createAction(
  '[RESET PASSWORD] Verify reset password',
  props<{ confirm: ConfirmResetPasswordModel }>()
);

export const verifySuccess = createAction(
  '[RESET PASSWORD] Verify reset password Success'
);

export const verifyFail = createAction(
  '[RESET PASSWORD] Verify reset password Fail',
  props<{ error: Error }>()
);

export const confirm = createAction(
  '[RESET PASSWORD] Confirm reset password',
  props<{ confirm: ConfirmResetPasswordModel }>()
);

export const confirmSuccess = createAction(
  '[RESET PASSWORD] Confirm reset password Success'
);

export const confirmFail = createAction(
  '[RESET PASSWORD] Confirm reset password Fail',
  props<{ error: Error }>()
);
