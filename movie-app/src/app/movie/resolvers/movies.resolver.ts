import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/store';
import * as MoviesStore from '../store/movie';
import { first } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MoviesResolver implements Resolve<void> {
  constructor(private store: Store<AppState>) {}

  resolve(): void {
    this.store
      .select(MoviesStore.selectTitle)
      .pipe(first())
      .subscribe((title) => {
        const isSearchInProgress = !!title.length;
        if (!isSearchInProgress) {
          this.store.dispatch(MoviesStore.search({ title: 'Futurama' }));
        }
      });
  }
}
