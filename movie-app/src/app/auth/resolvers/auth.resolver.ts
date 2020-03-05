import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { reset } from '../store/actions/auth.actions';
import { AppState } from 'src/app/core/store';

@Injectable({
  providedIn: 'root'
})
export class AuthResolver implements Resolve<void> {
  constructor(private store: Store<AppState>) {}
  resolve(): void {
    this.store.dispatch(reset());
  }
}
