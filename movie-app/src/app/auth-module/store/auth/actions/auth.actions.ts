import { createAction, props } from '@ngrx/store';
import { Credentials } from 'src/app/auth-module/models/credentials.model';
import { User } from 'src/app/auth-module/models/user.model';

export enum AuthActionTypes {
  AUTH_RESET = '[AUTH] Reset',

  AUTH_SIGN_UP = '[AUTH] Sign up',
  AUTH_SIGN_UP_SUCCES = '[AUTH] Sign up Success',
  AUTH_SIGN_UP_FAIL = '[AUTH] Sign up Fail',

  AUTH_SIGN_IN = '[AUTH] Sign in',
  AUTH_SIGN_IN_SUCCES = '[AUTH] Sign in Success',
  AUTH_SIGN_IN_FAIL = '[AUTH] Sign in Fail',

  AUTH_SIGN_OUT = '[AUTH] Sign out',
  AUTH_SIGN_OUT_SUCCESS = '[AUTH] Sign out Success',
  AUTH_SIGN_OUT_FAIL = '[AUTH] Sign out Fail'
}

export const reset = createAction(AuthActionTypes.AUTH_RESET);

export const signUp = createAction(
  AuthActionTypes.AUTH_SIGN_UP,
  props<{ credentials: Credentials }>()
);

export const signUpSuccess = createAction(
  AuthActionTypes.AUTH_SIGN_UP_SUCCES,
  props<{ credentials: Credentials }>()
);

export const signUpFail = createAction(
  AuthActionTypes.AUTH_SIGN_UP_FAIL,
  props<{ error: Error }>()
);

export const signIn = createAction(
  AuthActionTypes.AUTH_SIGN_IN,
  props<{ credentials: Credentials }>()
);

export const signInSuccess = createAction(
  AuthActionTypes.AUTH_SIGN_IN_SUCCES,
  props<{ user: User }>()
);

export const signInFail = createAction(
  AuthActionTypes.AUTH_SIGN_IN_FAIL,
  props<{ error: Error }>()
);

export const signOut = createAction(AuthActionTypes.AUTH_SIGN_OUT);

export const signOutSuccess = createAction(
  AuthActionTypes.AUTH_SIGN_OUT_SUCCESS
);

export const signOutFail = createAction(
  AuthActionTypes.AUTH_SIGN_OUT_FAIL,
  props<{ error: Error }>()
);
