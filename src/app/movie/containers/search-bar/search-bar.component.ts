import { Component, NgZone, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import {
  first,
  filter,
  debounceTime,
  distinctUntilChanged,
  takeUntil,
} from 'rxjs/operators';
import { AppState } from '../../../core/store';
import * as MovieStore from '../../store/movie';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit, OnDestroy {
  title = new FormControl('');

  destroyed$: Subject<boolean>;

  title$: Observable<string>;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.destroyed$ = new Subject<boolean>();
    this.title$ = this.store.select(MovieStore.selectTitle);
  }

  ngOnInit(): void {
    this.title.valueChanges
      .pipe(
        takeUntil(this.destroyed$),
        filter(Boolean),
        debounceTime(1200),
        distinctUntilChanged()
      )
      .subscribe((value) => this.search(value as string));
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.unsubscribe();
  }

  onEnter(): void {
    const searchedTitle = this.title.value.trim();

    if (!searchedTitle) {
      return;
    }

    this.search(searchedTitle);
  }

  search(searchedTitle: string): void {
    let isCurrentlyShown = false;

    this.title$.pipe(first()).subscribe((lastTitle) => {
      isCurrentlyShown =
        searchedTitle.toLowerCase() === lastTitle.toLowerCase();
      if (isCurrentlyShown) {
        return;
      }

      this.getSearchResult(searchedTitle);
    });
  }

  getSearchResult(searchedTitle: string): void {
    this.store
      .select(MovieStore.selectSearchedMovie, searchedTitle)
      .pipe(first())
      .subscribe((previousSearchResult) => {
        if (previousSearchResult) {
          this.store.dispatch(
            MovieStore.reloadSearchedMovies({
              title: searchedTitle,
            })
          );
        } else {
          this.store.dispatch(MovieStore.search({ title: searchedTitle }));
        }

        if (this.router.url !== '/movies') {
          this.ngZone.run(() => {
            this.router.navigate(['/movies']);
          });
        }
      });
  }
}
