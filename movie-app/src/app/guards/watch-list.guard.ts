import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../auth/models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../store';
import { selectUser } from '../auth/store/auth/selectors/auth.selectors';
import {
  Router,
  CanActivate,
  NavigationExtras,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Location } from '@angular/common';
import { AuthConstants } from '../auth/shared/auth.shared';

@Injectable({ providedIn: 'root' })
export class WatchListGuard implements CanActivate {
  user$: Observable<User | undefined>;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private location: Location
  ) {
    this.user$ = this.store.select(selectUser);
  }

  canActivate(
    _next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let isSignedIn = false;
    this.user$.subscribe(user => (isSignedIn = !!user));

    if (isSignedIn) {
      return true;
    }

    const redirectUrl = state.url;
    const redirectTo: NavigationExtras = {
      queryParams: { [AuthConstants.REDIRECT_URL]: redirectUrl },
      queryParamsHandling: 'merge',
      skipLocationChange: true
    };

    this.router.navigate(['/auth'], redirectTo).then(() => {
      this.location.replaceState(redirectUrl);
    });
    return false;
  }
}
