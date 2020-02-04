import { Component, OnInit } from '@angular/core';
import { OmdbApiService } from 'src/app/services/omdb-api.service';
import { Observable } from 'rxjs';
import { Movie } from '../models/Movie';

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

    this.apiService.getMovies(title).subscribe(movies => {
      this.loading = false;
      this.movies = movies;
    });
  }
}
