import { Injectable, NgZone } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

import * as ResetActions from '../actions/reset-password.actions';
import * as SnackBarStore from 'src/app/core/store/snack-bar';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class ResetPasswordEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private ngZone: NgZone
  ) {}

  requestResetLink$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ResetActions.requestResetLink),
      switchMap((action) => {
        const email = action.email;
        return this.authService.requestResetPasswordLink(email).pipe(
          switchMap(() => [
            SnackBarStore.success({
              message: `Your password reset link has been sent to ${email}`,
            }),
            ResetActions.requestResetLinkSuccess(),
          ]),
          catchError((error) =>
            of(ResetActions.requestResetLinkFail({ error }))
          )
        );
      })
    )
  );

  verify$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ResetActions.verify),
      switchMap((action) => {
        const confirm = action.confirm;
        return this.authService.verifyResetPasswordCode(confirm.oobCode).pipe(
          switchMap(() => [
            ResetActions.verifySuccess(),
            ResetActions.confirm({ confirm }),
          ]),
          catchError((error) => of(ResetActions.verifyFail({ error })))
        );
      })
    )
  );

  confirm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ResetActions.confirm),
      switchMap((action) =>
        this.authService.confirmResetPassword(action.confirm).pipe(
          switchMap(() => {
            this.ngZone.run(() => this.router.navigate(['/sign-in']));

            return [
              SnackBarStore.success({
                message: `Password reset successful`,
              }),
              ResetActions.confirmSuccess(),
            ];
          }),
          catchError((error) => of(ResetActions.confirmFail({ error })))
        )
      )
    )
  );

  onVerifyFail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ResetActions.verifyFail),
      map((action) => {
        this.ngZone.run(() => this.router.navigate(['/forgot-password']));
        return SnackBarStore.error({ message: action.error.message });
      })
    )
  );
}
