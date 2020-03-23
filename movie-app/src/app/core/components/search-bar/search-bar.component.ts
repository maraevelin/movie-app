import { Component, OnInit, NgZone } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { search } from '../../store/movie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  constructor(
    private store: Store<AppState>,
    private ngZone: NgZone,
    private router: Router
  ) {}

  ngOnInit() {}

  onSearch(title: string) {
    this.store.dispatch(search({ title }));

    this.ngZone.run(() => {
      this.ngZone.run(() => {
        this.router.navigate(['/movies']);
      });
    });
  }
}
