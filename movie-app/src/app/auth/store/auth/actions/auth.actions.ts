import { createAction, props } from '@ngrx/store';

import { Credentials } from 'src/app/auth/models/credentials.model';
import { User } from 'src/app/auth/models/user.model';

export const reset = createAction('[AUTH] Reset');

export const signUp = createAction(
  '[AUTH] Sign up',
  props<{ credentials: Credentials; returnUrl?: string | undefined }>()
);

export const signUpSuccess = createAction(
  '[AUTH] Sign up Success',
  props<{ credentials: Credentials; returnUrl?: string | undefined }>()
);

export const signUpFail = createAction(
  '[AUTH] Sign up Fail',
  props<{ error: Error; returnUrl?: string | undefined }>()
);

export const signIn = createAction(
  '[AUTH] Sign in',
  props<{ credentials: Credentials; returnUrl?: string | undefined }>()
);

export const signInSuccess = createAction(
  '[AUTH] Sign in Success',
  props<{ user: User; returnUrl?: string | undefined }>()
);

export const signInFail = createAction(
  '[AUTH] Sign in Fail',
  props<{ error: Error; returnUrl?: string | undefined }>()
);

export const signOut = createAction('[AUTH] Sign out');

export const signOutSuccess = createAction('[AUTH] Sign out Success');

export const signOutFail = createAction(
  '[AUTH] Sign out Fail',
  props<{ error: Error }>()
);
