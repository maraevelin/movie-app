import * as AuthActions from '../actions/auth.actions';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { AuthService } from 'src/app/auth/services/auth.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/models/user.model';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';

@Injectable()
export class AuthEffects {
  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signUp),
      switchMap(action => {
        return this.service.signup(action.credentials).pipe(
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
        return this.service.signin(action.credentials).pipe(
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
        this.service.signout().pipe(
          map(() => AuthActions.signOutSuccess()),
          catchError(error => of(AuthActions.signOutFail({ error })))
        )
      )
    )
  );

  automaticSignIn$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.signUpSuccess),
        tap(action =>
          this.store.dispatch(
            AuthActions.signIn({
              credentials: action.credentials,
              returnUrl: action.returnUrl
            })
          )
        )
      ),
    { dispatch: false }
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
    private router: Router,
    private store: Store<AppState>
  ) {}
}
