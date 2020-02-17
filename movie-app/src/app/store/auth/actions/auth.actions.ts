import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

export enum AuthActionTypes {
  AUTH_RESET = '[AUTH] Reset',

  AUTH_SIGN_UP = '[AUTH] Sign up',
  AUTH_SIGN_UP_SUCCES = '[AUTH] Sign up Success',
  AUTH_SIGN_UP_FAIL = '[AUTH] Sign up Fail',

  AUTH_SIGN_IN = '[AUTH] Sign in',
  AUTH_SIGN_IN_SUCCES = '[AUTH] Sign in Success',
  AUTH_SIGN_IN_FAIL = '[AUTH] Sign in Fail'
}

export const reset = createAction(AuthActionTypes.AUTH_RESET);

export const signUp = createAction(
  AuthActionTypes.AUTH_SIGN_UP,
  props<{ user: User }>()
);

export const signUpSuccess = createAction(AuthActionTypes.AUTH_SIGN_UP_SUCCES);

export const signUpFail = createAction(
  AuthActionTypes.AUTH_SIGN_UP_FAIL,
  props<{ error: Error }>()
);

export const signIn = createAction(
  AuthActionTypes.AUTH_SIGN_IN,
  props<{ user: User }>()
);

export const signInSuccess = createAction(AuthActionTypes.AUTH_SIGN_IN_SUCCES);

export const signInFail = createAction(
  AuthActionTypes.AUTH_SIGN_IN_FAIL,
  props<{ error: Error }>()
);
