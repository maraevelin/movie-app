import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { WatchListService } from '../../services/watch-list.service';

import * as WatchListActions from '../actions/watch-list.actions';
import * as AuthActions from '../../../auth/store/actions/auth.actions';
import * as SnackBarActions from '../../../core/store/snack-bar/actions/snack-bar.actions';

@Injectable()
export class WatchListEffects {
  constructor(private actions$: Actions, private service: WatchListService) {}

  loadOnSignInSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signInSuccess),
      map(() => WatchListActions.load()),
      catchError((error) =>
        of(
          SnackBarActions.error({
            message: error,
          })
        )
      )
    )
  );

  resetOnSignOutSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signOutSuccess),
      map(() => WatchListActions.reset()),
      catchError((error) =>
        of(
          SnackBarActions.error({
            message: error,
          })
        )
      )
    )
  );

  load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WatchListActions.load),
      switchMap(() =>
        this.service.load().pipe(
          map((data) => WatchListActions.loadSuccess({ data })),
          catchError((error) =>
            of(
              WatchListActions.loadFail({ error }),
              SnackBarActions.error({
                message: error,
              })
            )
          )
        )
      )
    )
  );

  addMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WatchListActions.addMovie),
      switchMap((action) =>
        this.service.addMovie(action.id).pipe(
          concatMap((dataDetailed) => [
            WatchListActions.addMovieSuccess({
              data: dataDetailed,
            }),
            SnackBarActions.success({
              message: `${dataDetailed.title} has been added to your watch list`,
            }),
          ]),
          catchError((error) =>
            of(
              WatchListActions.addMovieFail({ error }),
              SnackBarActions.error({
                message: error,
              })
            )
          )
        )
      )
    )
  );

  updateMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WatchListActions.updateMovie),
      switchMap((action) => {
        let data = action.data;
        data = { ...data, isFinished: !data.isFinished };

        return this.service.updateMovie(data).pipe(
          concatMap(() => [
            WatchListActions.updateMovieSuccess({ data }),
            SnackBarActions.success({
              message: `${action.data.title}'s status has been updated`,
            }),
          ]),
          catchError((error) =>
            of(
              WatchListActions.updateMovieFail({ error }),
              SnackBarActions.error({
                message: error,
              })
            )
          )
        );
      })
    )
  );

  deleteMovie$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WatchListActions.deleteMovie),
      switchMap((action) =>
        this.service.deleteMovie(action.id).pipe(
          concatMap(() => [
            WatchListActions.deleteMovieSuccess({
              id: action.id,
              title: action.title,
            }),
            SnackBarActions.success({
              message: `${action.title} has been removed from your watch list`,
            }),
          ]),
          catchError((error) =>
            of(
              WatchListActions.deleteMovieFail({ error }),
              SnackBarActions.error({
                message: error,
              })
            )
          )
        )
      )
    )
  );
}
