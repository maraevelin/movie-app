import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { AuthService } from 'src/app/services/auth.service';
import * as AuthActions from '../actions/auth.actions';
import {
  catchError,
  map,
  switchMap,
  withLatestFrom,
  tap
} from 'rxjs/operators';
import { of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { selectCredentials } from '../selectors/auth.selectors';
import { AppState } from '../..';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signUp),
      switchMap(action =>
        this.service.signup(action.credentials).pipe(
          map(() => AuthActions.signUpSuccess()),
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
            AuthActions.signInSuccess({ user: new User(response) })
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
      withLatestFrom(this.store.pipe(select(selectCredentials))),
      map(([, credentials]) => AuthActions.signIn({ credentials }))
    )
  );

  redirectToMovies$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.signInSuccess),
        tap(() => this.router.navigate(['/movies']))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private service: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) {}
}
