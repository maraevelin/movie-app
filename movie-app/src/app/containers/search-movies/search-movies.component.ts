import { Component, OnInit } from '@angular/core';
import { OmdbApiService } from 'src/app/services/omdb-api.service';
import { Movie } from '../../models/Movie';

@Component({
  selector: 'app-search-movies',
  templateUrl: './search-movies.component.html',
  styleUrls: ['./search-movies.component.scss']
})
export class SearchMoviesComponent implements OnInit {
  loading = false;
  movies: Movie[] = [];

  constructor(private apiService: OmdbApiService) { }

  ngOnInit() {
  }

  onSearch(title: string) {
    this.loading = true;
    this.apiService.getMovies(title).subscribe(movies => {
      this.loading = false;
      this.movies = movies;
    });
  }
}
