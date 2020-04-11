import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/store';
import { Observable } from 'rxjs';
import { selectTitle, search } from '../store/movie';

@Injectable({ providedIn: 'root' })
export class MoviesGuard implements CanActivate {
  title$: Observable<string>;

  constructor(private store: Store<AppState>) {
    this.title$ = this.store.select(selectTitle);
  }

  canActivate(): boolean {
    let isSearchInProgress = false;

    this.title$.subscribe((title) => (isSearchInProgress = !!title.length));

    if (!isSearchInProgress) {
      this.store.dispatch(search({ title: 'Futurama' }));
    }

    return true;
  }
}
