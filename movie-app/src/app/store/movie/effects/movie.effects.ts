import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { OmdbApiService } from 'src/app/services/omdb-api.service';
import {
  MovieActionTypes,
  SearchAction,
  SearchSuccessAction,
  SearchFailAction,
  GetDetailedAction,
  GetDetailedSuccessAction,
  GetDetailedFailAction
} from '../actions/movie.actions';
import { switchMap, map, catchError } from 'rxjs/operators';

@Injectable()
export class MovieEffects {
  searchMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType<SearchAction>(MovieActionTypes.MOVIE_SEARCH),
      switchMap(action =>
        this.service.searchMoviesByTitle(action.payload.title).pipe(
          map(response => new SearchSuccessAction(response)),
          catchError(error => of(new SearchFailAction(error)))
        )
      )
    )
  );

  getDetailedMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType<GetDetailedAction>(MovieActionTypes.MOVIE_GET_DETAILED),
      switchMap(action =>
        this.service.getMovieByImdbId(action.payload.id).pipe(
          map(response => new GetDetailedSuccessAction(response)),
          catchError(error => of(new GetDetailedFailAction(error)))
        )
      )
    )
  );
  constructor(private actions$: Actions, private service: OmdbApiService) {}
}
