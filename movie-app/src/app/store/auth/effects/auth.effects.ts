import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { AuthService } from 'src/app/services/auth.service';
import {
  signUp,
  signUpSuccess,
  signUpFail,
  signIn,
  signInSuccess,
  signInFail
} from '../actions/auth.actions';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { selectCredentials } from '../selectors/auth.selectors';
import { AppState } from '../..';

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
          map(() => signInSuccess()),
          catchError(error => of(signInFail({ error })))
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

  constructor(
    private actions$: Actions,
    private service: AuthService,
    private store: Store<AppState>
  ) {}
}
