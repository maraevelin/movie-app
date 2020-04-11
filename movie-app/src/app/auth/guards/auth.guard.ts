import { CanActivate, Router } from '@angular/router';
import { Injectable, NgZone } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/store';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import * as AuthStore from '../store';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  user$: Observable<User | undefined>;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.user$ = this.store.select(AuthStore.selectUser);
  }

  canActivate(): boolean {
    let isSignedIn = false;
    this.user$.subscribe((user) => (isSignedIn = !!user));

    if (isSignedIn) {
      this.ngZone.run(() => {
        this.router.navigate(['/movies']);
      });
      return false;
    }

    return true;
  }
}
