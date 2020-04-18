import { Injectable, OnDestroy } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { first, takeUntil } from 'rxjs/operators';
import { AppState } from 'src/app/core/store';
import * as MoviesStore from '../store/movie';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MoviesResolver implements Resolve<void>, OnDestroy {
  destroyed$: Subject<boolean>;

  constructor(private store: Store<AppState>) {
    this.destroyed$ = new Subject<boolean>();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.unsubscribe();
  }

  resolve(): void {
    this.store
      .select(MoviesStore.selectTitle)
      .pipe(first(), takeUntil(this.destroyed$))
      .subscribe((title) => {
        const isSearchInProgress = !!title.length;
        if (!isSearchInProgress) {
          this.store.dispatch(MoviesStore.search({ title: 'Futurama' }));
        }
      });
  }
}
