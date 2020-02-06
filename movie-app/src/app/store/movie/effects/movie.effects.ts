import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { OmdbApiService } from 'src/app/services/omdb-api.service';
import { MovieActionTypes, SearchMoviesAction, SearchMoviesSuccessAction, SearchMoviesFailAction, GetDetailedMovieAction, GetDetailedMovieSuccessAction, GetDetailedMovieFailAction } from '../actions/movie.actions';
import { switchMap, map, catchError } from 'rxjs/operators';


@Injectable()
export class MovieEffects {

  @Effect() searchMovies$ = this.actions$
    .pipe(
      ofType<SearchMoviesAction>(MovieActionTypes.SEARCH_MOVIES),
      switchMap(
        (action) => this.service.searchMoviesByTitle(action.title)
          .pipe(
            map(response => new SearchMoviesSuccessAction(response)),
            catchError(error => of(new SearchMoviesFailAction(error)))
          )
      ),
    );

    @Effect() getDetailedMovie$ = this.actions$
    .pipe(
      ofType<GetDetailedMovieAction>(MovieActionTypes.GET_DETAILED_MOVIE),
      switchMap(
        (action) => this.service.getMovieByImdbId(action.id)
          .pipe(
            map(response => new GetDetailedMovieSuccessAction(response)),
            catchError(error => of(new GetDetailedMovieFailAction(error)))
          )
      ),
    );

  constructor(
    private actions$: Actions,
    private service: OmdbApiService
  ) {}
}
