import { createAction, props } from '@ngrx/store';

export class SnackBarCSS {
  public static readonly success = 'snack-bar-success';
  public static readonly error = 'snack-bar-error';
}

export const notify = createAction(
  '[SNACK BAR] Notification',
  props<{
    message: string;
    cssClass: typeof SnackBarCSS.success | typeof SnackBarCSS.error;
  }>()
);
