import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { AuthService } from 'src/app/services/auth.service';
import {
  SignUpAction,
  SignInAction,
  AuthActionTypes,
  SignUpSuccessAction,
  SignUpFailAction,
  SignInSuccessAction,
  SignInFailAction
} from '../actions/auth.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class AuthEffects {
  @Effect() signUp$ = this.actions$.pipe(
    ofType<SignUpAction>(AuthActionTypes.AUTH_SIGN_UP),
    switchMap(action =>
      this.service.signup(action.user).pipe(
        map(response => new SignUpSuccessAction()),
        catchError(error => of(new SignUpFailAction(error)))
      )
    )
  );

  @Effect() signIn$ = this.actions$.pipe(
    ofType<SignInAction>(AuthActionTypes.AUTH_SIGN_IN),
    switchMap(action =>
      this.service.signin(action.user).pipe(
        map(response => new SignInSuccessAction()),
        catchError(error => of(new SignInFailAction(error)))
      )
    )
  );

  constructor(private actions$: Actions, private service: AuthService) {}
}
