import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-movies',
  templateUrl: './search-movies.component.html',
  styleUrls: ['./search-movies.component.scss']
})
export class SearchMoviesComponent implements OnInit {
  loading = false;
  results = [];

  constructor() { }

  ngOnInit() {
  }

  onSearch(title) {
    this.results = [];
    this.loading = true;

    setTimeout(() => {
      this.results = [title];
      this.loading =  false;
    }, 1500);
  }
}
