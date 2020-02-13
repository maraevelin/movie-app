import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  AUTH_RESET = '[AUTH] Reset',

  AUTH_SIGN_UP = '[AUTH] Sign up',
  AUTH_SIGN_UP_SUCCES = '[AUTH] Sign up Success',
  AUTH_SIGN_UP_FAIL = '[AUTH] Sign up Fail',

  AUTH_SIGN_IN = '[AUTH] Sign in',
  AUTH_SIGN_IN_SUCCES = '[AUTH] Sign in Success',
  AUTH_SIGN_IN_FAIL = '[AUTH] Sign in Fail'
}

export class AuthResetAction implements Action {
  readonly type = AuthActionTypes.AUTH_RESET;
}

export class SignUpAction implements Action {
  readonly type = AuthActionTypes.AUTH_SIGN_UP;
  constructor(public email: string) {}
}

export class SignUpSuccessAction implements Action {
  readonly type = AuthActionTypes.AUTH_SIGN_UP_SUCCES;
}

export class SignUpFailAction implements Action {
  readonly type = AuthActionTypes.AUTH_SIGN_UP_FAIL;
  constructor(public error: Error) {}
}

export class SignInAction implements Action {
  readonly type = AuthActionTypes.AUTH_SIGN_IN;
  constructor(public email: string) {}
}

export class SignInSuccessAction implements Action {
  readonly type = AuthActionTypes.AUTH_SIGN_IN_SUCCES;
}

export class SignInFailAction implements Action {
  readonly type = AuthActionTypes.AUTH_SIGN_IN_FAIL;
  constructor(public error: Error) {}
}

export type AuthAction =
  | AuthResetAction
  | SignUpAction
  | SignUpSuccessAction
  | SignUpFailAction
  | SignInAction
  | SignInSuccessAction
  | SignInFailAction;