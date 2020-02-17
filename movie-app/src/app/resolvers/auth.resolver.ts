import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../store';
import { reset } from '../store/auth/actions/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthResolver implements Resolve<void> {
  constructor(private store: Store<AppState>) {}
  resolve(): void {
    this.store.dispatch(reset());
  }
}
