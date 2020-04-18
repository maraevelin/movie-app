import { Injectable, NgZone } from '@angular/core';
import { Location } from '@angular/common';
import {
  Router,
  CanActivate,
  NavigationExtras,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/store';
import { AuthConstants } from '../../auth/shared/auth.shared';
import { User } from '../../auth/models/user.model';
import * as AuthStore from '../../auth/store/auth';

@Injectable({ providedIn: 'root' })
export class WatchListGuard implements CanActivate {
  user$: Observable<User | undefined>;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private location: Location,
    private ngZone: NgZone
  ) {
    this.user$ = this.store.select(AuthStore.selectUser);
  }

  canActivate(
    _next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.user$.pipe(
      map((user) => {
        const isSignedIn = !!user;
        if (isSignedIn) {
          return true;
        }

        const redirectUrl = state.url;
        const redirectTo: NavigationExtras = {
          queryParams: { [AuthConstants.REDIRECT_URL]: redirectUrl },
          queryParamsHandling: 'merge',
          skipLocationChange: true,
        };

        this.ngZone.run(() => {
          this.router.navigate(['/sign-in'], redirectTo).then(() => {
            this.location.replaceState(redirectUrl);
          });
        });

        return false;
      })
    );
  }
}
