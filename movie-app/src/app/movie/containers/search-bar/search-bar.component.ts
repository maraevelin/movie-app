import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { AppState } from '../../../core/store';
import * as MovieStore from '../../store/movie';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit, OnDestroy {
  destroyed$: Subject<boolean>;

  title = new FormControl('');

  title$: Observable<string>;

  constructor(private store: Store<AppState>) {
    this.destroyed$ = new Subject<boolean>();
    this.title$ = this.store.select(MovieStore.selectTitle);
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.unsubscribe();
  }

  onSearch() {
    const searchedTitle = this.title.value.trim();
    if (!searchedTitle) {
      return;
    }

    let isAlreadyShown = false;
    this.title$
      .pipe(first(), takeUntil(this.destroyed$))
      .subscribe((lastTitle) => {
        isAlreadyShown =
          searchedTitle.toLowerCase() === lastTitle.toLowerCase();
        if (isAlreadyShown) {
          return;
        }

        this.title.reset();
        this.store.dispatch(MovieStore.search({ title: searchedTitle }));
      });
  }
}
