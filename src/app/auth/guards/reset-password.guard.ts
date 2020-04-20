import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';

import * as ResetPasswordStore from '../store/reset-password';
import { AppState } from 'src/app/core/store';

@Injectable({ providedIn: 'root' })
export class ResetPasswordGuard implements CanActivate {
  constructor(private store: Store<AppState>) {}

  canActivate(next: ActivatedRouteSnapshot): boolean {
    const queryParams = next.queryParams;
    const mode = queryParams.mode;
    const oobCode = queryParams.oobCode;

    const canBeVerified =
      mode !== undefined && mode === 'resetPassword' && oobCode !== undefined;

    if (!canBeVerified) {
      const error = new Error(
        'Error during reset password, verification failed. Please, request a new reset link.'
      );
      this.store.dispatch(ResetPasswordStore.verifyFail({ error }));
    }

    return canBeVerified;
  }
}
