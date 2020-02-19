import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { AuthService } from 'src/app/services/auth.service';
import {
  signUp,
  signUpSuccess,
  signUpFail,
  signIn,
  signInSuccess,
  signInFail,
  signOut,
  signOutSuccess,
  signOutFail
} from '../actions/auth.actions';
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
      ofType(signUp),
      switchMap(action =>
        this.service.signup(action.credentials).pipe(
          map(() => signUpSuccess()),
          catchError(error => of(signUpFail({ error })))
        )
      )
    )
  );

  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signIn),
      switchMap(action => {
        return this.service.signin(action.credentials).pipe(
          map(response => signInSuccess({ user: new User(response) })),
          catchError(error => of(signInFail({ error })))
        );
      })
    )
  );

  signOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signOut),
      switchMap(_action => {
        return this.service.signout().pipe(
          map(() => signOutSuccess()),
          catchError(error => of(signOutFail({ error })))
        );
      })
    )
  );

  automaticSignIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signUpSuccess),
      withLatestFrom(this.store.pipe(select(selectCredentials))),
      map(([_action, credentials]) => signIn({ credentials }))
    )
  );

  redirectToMovies$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(signInSuccess),
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
