import { createAction, props } from '@ngrx/store';

export const success = createAction(
  '[SNACK BAR NOTIFICATION] Success',
  props<{
    message: string;
  }>()
);

export const error = createAction(
  '[SNACK BAR NOTIFICATION] Error',
  props<{
    message: string;
  }>()
);
