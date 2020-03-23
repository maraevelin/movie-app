import { Component, OnInit, NgZone } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { search } from '../../store/movie';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  title = new FormControl('');

  constructor(
    private store: Store<AppState>,
    private ngZone: NgZone,
    private router: Router
  ) {}

  ngOnInit() {}

  onSearch() {
    const title = this.title.value;
    if (!title) {
      return;
    }

    this.title.reset();
    this.store.dispatch(search({ title }));

    this.ngZone.run(() => {
      this.router.navigate(['/movies']);
    });
  }
}
