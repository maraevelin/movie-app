import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-movies',
  templateUrl: './search-movies.component.html',
  styleUrls: ['./search-movies.component.scss']
})
export class SearchMoviesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSearch(title) {
    console.log(title);
  }

}
