import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { OmdbApiService } from 'src/app/services/omdb-api.service';
import { MovieActionTypes, SearchMoviesAction, SearchMoviesSuccessAction, SearchMoviesFailAction } from '../actions/movie.actions';
import { switchMap, map, catchError } from 'rxjs/operators';


@Injectable()
export class MovieEffects {

  @Effect() searchMovies$ = this.actions$
    .pipe(
      ofType<SearchMoviesAction>(MovieActionTypes.SEARCH_MOVIES),
      switchMap(
        (action) => this.service.getMovies(action.title)
          .pipe(
            map(response => new SearchMoviesSuccessAction(response)),
            catchError(error => of(new SearchMoviesFailAction(error)))
          )
      ),
    );

  constructor(
    private actions$: Actions,
    private service: OmdbApiService
  ) {}
}
