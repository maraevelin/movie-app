import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as SnackBarActions from '../actions/snack-bar.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs/operators';

@Injectable()
export class SnackBarEffects {
  constructor(private actions$: Actions, private snackBar: MatSnackBar) {}

  notifications$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SnackBarActions.notify),
        tap((action) => {
          this.snackBar.open(action.message, undefined, {
            panelClass: [action.cssClass],
            duration: 5000,
          });
        })
      ),
    { dispatch: false }
  );
}
