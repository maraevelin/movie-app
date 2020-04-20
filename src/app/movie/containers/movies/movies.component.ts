import { Component, OnInit, OnDestroy } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/store';
import { Observable } from 'rxjs';
import * as MovieStore from '../../store/movie';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit, OnDestroy {
  isLoading$: Observable<boolean>;
  title$: Observable<string>;
  movies$: Observable<Movie[]>;

  constructor(private store: Store<AppState>) {
    this.isLoading$ = this.store.select(MovieStore.selectIsLoading);
    this.movies$ = this.store.select(MovieStore.selectMovies);
    this.title$ = this.store.select(MovieStore.selectTitle);
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.store.dispatch(MovieStore.reset());
  }
}
