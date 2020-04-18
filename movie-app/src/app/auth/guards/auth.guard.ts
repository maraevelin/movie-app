import { CanActivate, Router } from '@angular/router';
import { Injectable, NgZone, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/store';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/user.model';
import * as AuthStore from '../store';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, OnDestroy {
  destroyed$: Subject<boolean>;
  user$: Observable<User | undefined>;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.destroyed$ = new Subject<boolean>();
    this.user$ = this.store.select(AuthStore.selectUser);
  }
  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.unsubscribe();
  }

  canActivate(): boolean {
    let isSignedIn = false;
    this.user$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((user) => (isSignedIn = !!user));

    if (isSignedIn) {
      this.ngZone.run(() => {
        this.router.navigate(['/movies']);
      });
      return false;
    }

    return true;
  }
}
