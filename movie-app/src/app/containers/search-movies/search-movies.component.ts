import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { Observable } from 'rxjs';
import {
  selectIsLoading,
  selectMovies,
  selectErrorMessage
} from 'src/app/store/movie/selectors/movie.selectors';
import { search } from 'src/app/store/movie/actions/movie.actions';

@Component({
  selector: 'app-search-movies',
  templateUrl: './search-movies.component.html',
  styleUrls: ['./search-movies.component.scss']
})
export class SearchMoviesComponent implements OnInit {
  isLoading$: Observable<boolean>;
  movies$: Observable<Movie[]>;
  errorMessage$: Observable<string | undefined>;

  constructor(private store: Store<AppState>) {
    this.isLoading$ = this.store.select(selectIsLoading);
    this.movies$ = this.store.select(selectMovies);
    this.errorMessage$ = this.store.select(selectErrorMessage);
  }

  ngOnInit() {}

  onSearch(title: string) {
    this.store.dispatch(search({ title }));
  }
}
