import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { OmdbApiService } from 'src/app/core/services/omdb-api.service';
import * as MovieActions from '../actions/movie.actions';
import { switchMap, map, catchError } from 'rxjs/operators';

@Injectable()
export class MovieEffects {
  searchMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovieActions.search),
      switchMap(action =>
        this.service.searchMoviesByTitle(action.title).pipe(
          map(movies => MovieActions.searchSuccess({ movies })),
          catchError(error => of(MovieActions.searchFail({ error })))
        )
      )
    )
  );

  getDetailedMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovieActions.getDetailed),
      switchMap(action =>
        this.service.getMovieByImdbId(action.id).pipe(
          map(detailedMovie =>
            MovieActions.getDetailedSuccess({ detailedMovie })
          ),
          catchError(error => of(MovieActions.getDetailedFail({ error })))
        )
      )
    )
  );
  constructor(private actions$: Actions, private service: OmdbApiService) {}
}
