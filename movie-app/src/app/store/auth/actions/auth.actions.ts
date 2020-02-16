import { Action } from '@ngrx/store';
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

export class ResetAction implements Action {
  readonly type = AuthActionTypes.AUTH_RESET;
}

export class SignUpAction implements Action {
  readonly type = AuthActionTypes.AUTH_SIGN_UP;
  readonly payload: { user: User };

  constructor(user: User) {
    this.payload = { user };
  }
}

export class SignUpSuccessAction implements Action {
  readonly type = AuthActionTypes.AUTH_SIGN_UP_SUCCES;
}

export class SignUpFailAction implements Action {
  readonly type = AuthActionTypes.AUTH_SIGN_UP_FAIL;
  readonly payload: { error: Error };

  constructor(error: Error) {
    this.payload = { error };
  }
}

export class SignInAction implements Action {
  readonly type = AuthActionTypes.AUTH_SIGN_IN;
  readonly payload: { user: User };

  constructor(user: User) {
    this.payload = { user };
  }
}

export class SignInSuccessAction implements Action {
  readonly type = AuthActionTypes.AUTH_SIGN_IN_SUCCES;
}

export class SignInFailAction implements Action {
  readonly type = AuthActionTypes.AUTH_SIGN_IN_FAIL;
  readonly payload: { error: Error };

  constructor(error: Error) {
    this.payload = { error };
  }
}

export type AuthAction =
  | ResetAction
  | SignUpAction
  | SignUpSuccessAction
  | SignUpFailAction
  | SignInAction
  | SignInSuccessAction
  | SignInFailAction;
