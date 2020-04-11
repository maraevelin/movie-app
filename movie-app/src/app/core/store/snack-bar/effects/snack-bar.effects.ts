import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs/operators';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { SnackBarCSS } from 'src/app/core/models/snack-bar-css';
import * as SnackBarActions from '../actions/snack-bar.actions';

@Injectable()
export class SnackBarEffects {
  constructor(private actions$: Actions, private snackBar: MatSnackBar) {}

  successNotification$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SnackBarActions.success),
        tap((action) => {
          this.snackBar.open(action.message, undefined, {
            panelClass: [SnackBarCSS.SUCCESS],
            duration: 5000,
          });
        })
      ),
    { dispatch: false }
  );

  errorNotification$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SnackBarActions.error),
        tap((action) => {
          this.snackBar.open(action.message, undefined, {
            panelClass: [SnackBarCSS.ERROR],
            duration: 5000,
          });
        })
      ),
    { dispatch: false }
  );
}
