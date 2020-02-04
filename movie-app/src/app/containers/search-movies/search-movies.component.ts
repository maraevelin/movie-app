import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/services/models/Movie';
import { OmdbApiService } from 'src/app/services/omdb-api.service';
import { SearchResponse } from 'src/app/services/models/SearchResponse';

@Component({
  selector: 'app-search-movies',
  templateUrl: './search-movies.component.html',
  styleUrls: ['./search-movies.component.scss']
})
export class SearchMoviesComponent implements OnInit {
  loading = false;
  movies: Movie[] = [];
  error: string = null;

  constructor(private apiService: OmdbApiService) { }

  ngOnInit() {
  }

  onSearch(title) {
    this.loading = true;
    this.error = null;

    this.apiService.getMovies(title).subscribe((data: SearchResponse) => {
      this.loading =  false;

      if (!!data.Error) {
        this.movies = [];
        this.error = data.Error;
        return;
      }

      this.movies = {...data.Search};
    });
  }
}
