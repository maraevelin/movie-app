import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/store';
import { Observable } from 'rxjs';
import * as MovieSelectors from 'src/app/core/store/movie/selectors/movie.selectors';
import { reset } from '../../store/movie';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  isLoading$: Observable<boolean>;
  title$: Observable<string>;
  movies$: Observable<Movie[]>;

  constructor(private store: Store<AppState>) {
    this.isLoading$ = this.store.select(MovieSelectors.selectIsLoading);
    this.movies$ = this.store.select(MovieSelectors.selectMovies);
    this.title$ = this.store.select(MovieSelectors.selectTitle);
  }

  ngOnInit() {
    this.store.dispatch(reset());
  }
}
