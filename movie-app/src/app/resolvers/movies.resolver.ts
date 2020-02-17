import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../store';
import { reset } from '../store/movie/actions/movie.actions';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MoviesResolver implements Resolve<void> {
  constructor(private store: Store<AppState>) {}

  resolve(): void {
    this.store.dispatch(reset());
  }
}
