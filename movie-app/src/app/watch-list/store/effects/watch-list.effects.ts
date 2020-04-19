import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { WatchListService } from '../../services/watch-list.service';
import * as AuthStore from '../../../auth/store/auth';
import * as SnackBarStore from '../../../core/store/snack-bar/';
import * as WatchListActions from '../actions/watch-list.actions';

@Injectable()
export class WatchListEffects {
  constructor(
    private actions$: Actions,
    private watchListService: WatchListService
  ) {}

  loadOnSignInSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthStore.signInSuccess),
      map(() => WatchListActions.load()),
      catchError((error) =>
        of(
          SnackBarStore.error({
            message: error,
          })
        )
      )
    )
  );

  resetOnSignOutSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthStore.signOutSuccess),
      map(() => WatchListActions.reset()),
      catchError((error) =>
        of(
          SnackBarStore.error({
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
        this.watchListService.load().pipe(
          map((data) => WatchListActions.loadSuccess({ data })),
          catchError((error) =>
            of(
              WatchListActions.loadFail({ error }),
              SnackBarStore.error({
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
        this.watchListService.addMovie(action.id).pipe(
          concatMap((dataDetailed) => [
            WatchListActions.addMovieSuccess({
              data: dataDetailed,
            }),
            SnackBarStore.success({
              message: `${dataDetailed.title} has been added to your watch list`,
            }),
          ]),
          catchError((error) =>
            of(
              WatchListActions.addMovieFail({ error }),
              SnackBarStore.error({
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

        return this.watchListService.updateMovie(data).pipe(
          concatMap(() => [
            WatchListActions.updateMovieSuccess({ data }),
            SnackBarStore.success({
              message: `${action.data.title}'s status has been updated`,
            }),
          ]),
          catchError((error) =>
            of(
              WatchListActions.updateMovieFail({ error }),
              SnackBarStore.error({
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
        this.watchListService.deleteMovie(action.id).pipe(
          concatMap(() => [
            WatchListActions.deleteMovieSuccess({
              id: action.id,
              title: action.title,
            }),
            SnackBarStore.success({
              message: `${action.title} has been removed from your watch list`,
            }),
          ]),
          catchError((error) =>
            of(
              WatchListActions.deleteMovieFail({ error }),
              SnackBarStore.error({
                message: error,
              })
            )
          )
        )
      )
    )
  );
}
