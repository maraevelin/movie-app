import * as AuthActions from '../actions/auth.actions';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { AuthService } from 'src/app/auth/services/auth.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/models/user.model';
import { of } from 'rxjs';

@Injectable()
export class AuthEffects {
  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signUp),
      switchMap(action => {
        return this.service.signUp(action.credentials).pipe(
          map(() =>
            AuthActions.signUpSuccess({
              credentials: action.credentials,
              returnUrl: action.returnUrl
            })
          ),
          catchError(error => of(AuthActions.signUpFail({ error })))
        );
      })
    )
  );

  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signIn),
      switchMap(action => {
        return this.service.signIn(action.credentials).pipe(
          map(response =>
            AuthActions.signInSuccess({
              user: new User(response),
              returnUrl: action.returnUrl
            })
          ),
          catchError(error => {
            return of(AuthActions.signInFail({ error }));
          })
        );
      })
    )
  );

  signOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signOut),
      switchMap(() =>
        this.service.signOut().pipe(
          map(() => AuthActions.signOutSuccess()),
          catchError(error => of(AuthActions.signOutFail({ error })))
        )
      )
    )
  );

  automaticSignIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signUpSuccess),
      map(action =>
        AuthActions.signIn({
          credentials: action.credentials,
          returnUrl: action.returnUrl
        })
      )
    )
  );

  automaticRedirectOnSignInSuccess$ = createEffect(
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

  automaticRedirectOnSignOutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.signOutSuccess),
        tap(() => this.router.navigate(['/']))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private service: AuthService,
    private router: Router
  ) {}
}
