import * as AuthActions from '../actions/auth.actions';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { AuthService } from 'src/app/auth-module/services/auth.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/auth-module/models/user.model';
import { of } from 'rxjs';

@Injectable()
export class AuthEffects {
  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signUp),
      switchMap(action =>
        this.service.signup(action.credentials).pipe(
          map(() =>
            AuthActions.signUpSuccess({
              credentials: action.credentials,
              returnUrl: action.returnUrl
            })
          ),
          catchError(error => of(AuthActions.signUpFail({ error })))
        )
      )
    )
  );

  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signIn),
      switchMap(action => {
        return this.service.signin(action.credentials).pipe(
          map(response =>
            AuthActions.signInSuccess({
              user: new User(response),
              returnUrl: action.returnUrl
            })
          ),
          catchError(error => of(AuthActions.signInFail({ error })))
        );
      })
    )
  );

  signOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signOut),
      switchMap(() => {
        return this.service.signout().pipe(
          map(() => AuthActions.signOutSuccess()),
          catchError(error => of(AuthActions.signOutFail({ error })))
        );
      })
    )
  );

  automaticSignIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signUpSuccess),
      tap(action =>
        AuthActions.signIn({
          credentials: action.credentials,
          returnUrl: action.returnUrl
        })
      )
    )
  );

  automaticRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.signInSuccess),
        tap(action => {
          const returnUrl: string = action.returnUrl || '/movies';
          this.router.navigate([returnUrl]);
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private service: AuthService,
    private router: Router
  ) {}
}
