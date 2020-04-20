import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs/operators';
import { Actions, ofType, createEffect } from '@ngrx/effects';

import * as SnackBarActions from '../actions/snack-bar.actions';
import { SnackBarCSS } from 'src/app/core/models/snack-bar-css';

@Injectable()
export class SnackBarEffects {
  readonly duration = 5000;
  readonly closeSign = '×';

  constructor(private actions$: Actions, private snackBar: MatSnackBar) {}

  successNotification$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SnackBarActions.success),
        tap((action) => {
          this.snackBar.open(action.message, this.closeSign, {
            panelClass: [SnackBarCSS.SUCCESS],
            duration: this.duration,
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
          this.snackBar.open(action.message, this.closeSign, {
            panelClass: [SnackBarCSS.ERROR],
            duration: this.duration,
          });
        })
      ),
    { dispatch: false }
  );
}
