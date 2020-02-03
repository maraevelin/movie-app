import { Component, OnInit } from '@angular/core';
import { OmdbApiServiceService } from '../services/omdb-api-service.service';
import { TitleResponse } from '../services/models/TitleResponse';

@Component({
  selector: 'app-search-movies',
  templateUrl: './search-movies.component.html',
  styleUrls: ['./search-movies.component.scss']
})
export class SearchMoviesComponent implements OnInit {
  loading = false;
  results = [];

  constructor(private apiService: OmdbApiServiceService) { }

  ngOnInit() {
  }

  onSearch(title) {
    this.results = [];
    this.loading = true;

    const results = this.apiService.getMovies(title).subscribe((data: TitleResponse) => {
      if (data.Response === 'True') {
        console.log(data);
      } else {
        console.error(data);
      }
    });

    this.results = [title];
    this.loading =  false;
  }
}
