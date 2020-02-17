import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { OmdbApiService } from 'src/app/services/omdb-api.service';
import {
  search,
  searchSuccess,
  searchFail,
  getDetailed,
  getDetailedSuccess,
  getDetailedFail
} from '../actions/movie.actions';
import { switchMap, map, catchError } from 'rxjs/operators';

@Injectable()
export class MovieEffects {
  searchMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(search),
      switchMap(action =>
        this.service.searchMoviesByTitle(action.title).pipe(
          map(movies => searchSuccess({ movies })),
          catchError(error => of(searchFail({ error })))
        )
      )
    )
  );

  getDetailedMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getDetailed),
      switchMap(action =>
        this.service.getMovieByImdbId(action.id).pipe(
          map(detailedMovie => getDetailedSuccess({ detailedMovie })),
          catchError(error => of(getDetailedFail({ error })))
        )
      )
    )
  );
  constructor(private actions$: Actions, private service: OmdbApiService) {}
}
