import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/store';
import { Observable } from 'rxjs';
import * as MovieSelectors from 'src/app/core/store/movie/selectors/movie.selectors';
import { search } from 'src/app/core/store/movie/actions/movie.actions';

@Component({
  selector: 'app-search-movies',
  templateUrl: './search-movies.component.html',
  styleUrls: ['./search-movies.component.scss']
})
export class SearchMoviesComponent implements OnInit {
  isLoading$: Observable<boolean>;
  movies$: Observable<Movie[]>;

  constructor(private store: Store<AppState>) {
    this.isLoading$ = this.store.select(MovieSelectors.selectIsLoading);
    this.movies$ = this.store.select(MovieSelectors.selectMovies);
  }

  ngOnInit() {}

  onSearch(title: string) {
    this.store.dispatch(search({ title }));
  }
}
