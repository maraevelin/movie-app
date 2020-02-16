import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/root-reducer';
import { SearchAction } from 'src/app/store/movie/actions/movie.actions';
import { Observable } from 'rxjs';
import {
  selectIsLoading,
  selectMovies,
  selectErrorMessage
} from 'src/app/store/movie/selectors/movie.selectors';

@Component({
  selector: 'app-search-movies',
  templateUrl: './search-movies.component.html',
  styleUrls: ['./search-movies.component.scss']
})
export class SearchMoviesComponent implements OnInit {
  isLoading$: Observable<boolean>;
  movies$: Observable<Movie[]>;
  errorMessage$: Observable<string | null>;

  constructor(private store: Store<AppState>) {
    this.isLoading$ = this.store.select(selectIsLoading);
    this.movies$ = this.store.select(selectMovies);
    this.errorMessage$ = this.store.select(selectErrorMessage);
  }

  ngOnInit() {}

  onSearch(title: string) {
    this.store.dispatch(new SearchAction(title));
  }
}
