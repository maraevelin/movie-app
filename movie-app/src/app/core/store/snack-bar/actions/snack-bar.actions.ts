import { createAction, props } from '@ngrx/store';

export const notify = createAction(
  '[SNACK BAR] Notification',
  props<{ message: string; cssClass: string }>()
);
