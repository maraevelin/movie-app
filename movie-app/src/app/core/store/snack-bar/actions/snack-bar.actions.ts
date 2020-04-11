import { createAction, props } from '@ngrx/store';

export const success = createAction(
  '[NOTIFICATION] Success',
  props<{
    message: string;
  }>()
);

export const error = createAction(
  '[NOTIFICATION] Error',
  props<{
    message: string;
  }>()
);
