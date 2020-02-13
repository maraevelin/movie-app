import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailedMovie } from '../../models/DetailedMovie';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/root-reducer';
import { GetDetailedMovieAction } from 'src/app/store/movie/actions/movie.actions';
import {
  selectDetailedMovie,
  selectIsLoading,
  selectErrorMessage
} from 'src/app/store/movie/selectors/movie.selectors';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  movie$?: Observable<DetailedMovie | null>;
  isLoading$: Observable<boolean>;
  errorMessage$: Observable<string | null>;

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {
    const id: string = this.route.snapshot.paramMap.get('id') || '';
    this.store.dispatch(new GetDetailedMovieAction(id));

    this.isLoading$ = this.store.select(selectIsLoading);
    this.movie$ = this.store.select(selectDetailedMovie);
    this.errorMessage$ = this.store.select(selectErrorMessage);
  }

  ngOnInit() {}
}
