import { Component, OnInit, NgZone } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/store';
import { search, selectTitle } from '../../store/movie';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  title = new FormControl('');
  title$: Observable<string>;

  constructor(
    private store: Store<AppState>,
    private ngZone: NgZone,
    private router: Router
  ) {
    this.title$ = this.store.select(selectTitle);
  }

  ngOnInit() {}

  onSearch() {
    const title = this.title.value.trim();
    if (!title) {
      return;
    }

    let isAlreadyShown = false;
    this.title$.subscribe(
      t => (isAlreadyShown = title.toLowerCase() === t.toLowerCase())
    );
    if (isAlreadyShown) {
      return;
    }

    this.title.reset();
    this.store.dispatch(search({ title }));

    this.ngZone.run(() => {
      this.router.navigate(['/movies']);
    });
  }
}
