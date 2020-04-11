import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { AppState } from '../../../core/store';
import * as MovieStore from '../../store/movie';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  title = new FormControl('');

  title$: Observable<string>;

  constructor(private store: Store<AppState>) {
    this.title$ = this.store.select(MovieStore.selectTitle);
  }

  ngOnInit() {}

  onSearch() {
    const searchedTitle = this.title.value.trim();
    if (!searchedTitle) {
      return;
    }

    let isAlreadyShown = false;
    this.title$.pipe(first()).subscribe((lastTitle) => {
      isAlreadyShown = searchedTitle.toLowerCase() === lastTitle.toLowerCase();
      if (isAlreadyShown) {
        return;
      }

      this.title.reset();
      this.store.dispatch(MovieStore.search({ title: searchedTitle }));
    });
  }
}
