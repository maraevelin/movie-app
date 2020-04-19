import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import * as AuthActions from '../actions/auth.actions';
import * as SnackBarStore from 'src/app/core/store/snack-bar/';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/auth/models/user.model';

@Injectable()
export class AuthEffects {
  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signUp),
      switchMap((action) => {
        return this.authService.signUp(action.credentials).pipe(
          switchMap(() => {
            return [
              SnackBarStore.success({
                message: 'Your account has been created',
              }),
              AuthActions.signUpSuccess({
                credentials: action.credentials,
                returnUrl: action.returnUrl,
              }),
            ];
          }),
          catchError((error) =>
            of(
              AuthActions.signUpFail({ error }),
              SnackBarStore.error({
                message: error.message,
              })
            )
          )
        );
      })
    )
  );

  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signIn),
      switchMap((action) =>
        this.authService.signIn(action.credentials).pipe(
          map((response) =>
            AuthActions.signInSuccess({
              user: new User(response),
              returnUrl: action.returnUrl,
            })
          ),
          catchError((error) =>
            of(
              AuthActions.signInFail({ error }),
              SnackBarStore.error({
                message: error.message,
              })
            )
          )
        )
      )
    )
  );

  signOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signOut),
      switchMap(() =>
        this.authService.signOut().pipe(
          map(() => AuthActions.signOutSuccess()),
          catchError((error) => of(AuthActions.signOutFail({ error })))
        )
      )
    )
  );

  automaticSignIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signUpSuccess),
      map((action) =>
        AuthActions.signIn({
          credentials: action.credentials,
          returnUrl: action.returnUrl,
        })
      )
    )
  );

  automaticRedirectOnSignInSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.signInSuccess),
        tap((action) => {
          const returnUrl: string = action.returnUrl || '/movies';
          this.ngZone.run(() => {
            this.router.navigate([returnUrl]);
          });
        })
      ),
    { dispatch: false }
  );

  automaticRedirectOnSignOutSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.signOutSuccess),
        tap(() => {
          this.ngZone.run(() => this.router.navigate(['/']));
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private ngZone: NgZone
  ) {}
}
