import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { reset } from '../store/auth/actions/auth.actions';
import { AppState } from 'src/app/store';

@Injectable({
  providedIn: 'root'
})
export class AuthResolver implements Resolve<void> {
  constructor(private store: Store<AppState>) {}
  resolve(): void {
    this.store.dispatch(reset());
  }
}
