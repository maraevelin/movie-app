import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
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
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { selectUser } from '../selectors/auth.selectors';
import { AppState } from '../..';

@Injectable()
export class AuthEffects {
  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType<SignUpAction>(AuthActionTypes.AUTH_SIGN_UP),
      switchMap(action =>
        this.service.signup(action.payload.user).pipe(
          map(() => new SignUpSuccessAction()),
          catchError(error => of(new SignUpFailAction(error)))
        )
      )
    )
  );

  automaticSignIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType<SignUpSuccessAction>(AuthActionTypes.AUTH_SIGN_UP_SUCCES),
      withLatestFrom(this.store.pipe(select(selectUser))),
      map(([action, user]) => new SignInAction(user))
    )
  );

  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType<SignInAction>(AuthActionTypes.AUTH_SIGN_IN),
      switchMap(action => {
        return this.service.signin(action.payload.user).pipe(
          map(() => new SignInSuccessAction()),
          catchError(error => of(new SignInFailAction(error)))
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private service: AuthService,
    private store: Store<AppState>
  ) {}
}
