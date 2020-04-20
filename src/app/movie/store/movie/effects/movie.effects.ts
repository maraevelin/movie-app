import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { OmdbService } from 'src/app/movie/services/omdb.service';
import * as MovieActions from '../actions/movie.actions';

@Injectable()
export class MovieEffects {
  searchMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovieActions.search),
      switchMap((action) =>
        this.omdbService.searchMoviesByTitle(action.title).pipe(
          map((movies) => MovieActions.searchSuccess({ movies })),
          catchError((error) => of(MovieActions.searchFail({ error })))
        )
      )
    )
  );

  getDetailedMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MovieActions.getDetailed),
      switchMap((action) =>
        this.omdbService.getMovieByImdbId(action.id).pipe(
          map((detailedMovie) =>
            MovieActions.getDetailedSuccess({ detailedMovie })
          ),
          catchError((error) => of(MovieActions.getDetailedFail({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private omdbService: OmdbService) {}
}
