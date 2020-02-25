import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store';
import { Observable } from 'rxjs';
import { User } from './models/user.model';
import { selectUser } from './store/auth/selectors/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  user$: Observable<User | undefined>;

  constructor(private store: Store<AppState>, private router: Router) {
    this.user$ = this.store.select(selectUser);
  }

  canActivate(): boolean {
    let isSignedIn = false;
    this.user$.subscribe(user => (isSignedIn = !!user));

    if (isSignedIn) {
      this.router.navigate(['/movies']);
      return false;
    }

    return true;
  }
}
