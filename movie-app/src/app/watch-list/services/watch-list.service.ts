import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, from, forkJoin, of } from 'rxjs';
import { concatMap, map, flatMap, filter, first } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as firebase from 'firebase/app';

import { environment } from 'src/environments/environment';
import { DetailedMovie } from 'src/app/movie/models/detailed-movie.model';
import { OmdbApiService } from 'src/app/movie/services/omdb-api.service';
import { WatchListData } from '../models/watch-list-data.model';
import { WatchListDataDetailed } from '../models/watch-list-data-detailed.model';
import { AppState } from 'src/app/core/store';
import * as AuthStore from '../../auth/store/auth';

@Injectable({ providedIn: 'root' })
export class WatchListService {
  userId$: Observable<string | undefined>;
  watchList = {};
  converter = {
    toFirestore: (
      data: Record<string, WatchListData>
    ): Record<string, WatchListData> => data,
    fromFirestore: (
      snapshot: any,
      options: any
    ): Record<string, WatchListData> => {
      return snapshot.data(options);
    },
  };

  constructor(
    private angularFirestore: AngularFirestore,
    private omdbService: OmdbApiService,
    private store: Store<AppState>
  ) {
    this.userId$ = this.store.select(AuthStore.selectUserId);
    this.userId$.subscribe();
  }

  load(): Observable<Record<string, WatchListDataDetailed>> {
    return this.userId$.pipe(
      first(),
      filter((userId) => userId !== undefined),
      flatMap((userId) => {
        return from(
          this.angularFirestore.firestore
            .collection(environment.firebaseConfig.testCollection)
            .doc(userId)
            .withConverter(this.converter)
            .get()
        ).pipe(
          filter((doc) => doc.data() !== undefined),
          concatMap((doc) => {
            const data = doc.data() as Record<string, WatchListDataDetailed>;

            const movies: Observable<DetailedMovie>[] = Object.keys(data)
              .filter((id) => id.startsWith('tt'))
              .map((id) => this.omdbService.getMovieByImdbId(id, 'short'));

            return forkJoin(movies).pipe(
              map((detailedMovies) =>
                detailedMovies.reduce(
                  (
                    record: Record<string, WatchListDataDetailed>,
                    detailedMovie
                  ) => {
                    const id = detailedMovie.imdbId as keyof WatchListData;
                    record[id] = {
                      id,
                      isFinished: data[id].isFinished,
                      title: detailedMovie.title,
                      posterUrl: detailedMovie.posterUrl,
                      plot: detailedMovie.plot,
                    };
                    return record;
                  },
                  {}
                )
              )
            );
          })
        );
      })
    );
  }

  addMovie(id: string): Observable<WatchListDataDetailed> {
    return this.userId$.pipe(
      first(),
      filter((userId) => userId !== undefined),
      flatMap((userId) => {
        const data = { id, isFinished: false };

        return from(
          this.angularFirestore
            .collection(environment.firebaseConfig.testCollection)
            .doc(userId)
            .set({ [data.id]: data }, { merge: true })
        ).pipe(() => {
          return this.omdbService.getMovieByImdbId(data.id, 'short').pipe(
            concatMap((detailedMovie) =>
              of({
                id: data.id,
                isFinished: data.isFinished,
                title: detailedMovie.title,
                plot: detailedMovie.plot,
                posterUrl: detailedMovie.posterUrl,
              })
            )
          );
        });
      })
    );
  }

  updateMovie(dataDetailed: WatchListDataDetailed): Observable<void> {
    return this.userId$.pipe(
      first(),
      filter((userId) => userId !== undefined),
      flatMap((userId) => {
        const data = {
          id: dataDetailed.id,
          isFinished: dataDetailed.isFinished,
        };

        return from(
          this.angularFirestore.firestore
            .collection(environment.firebaseConfig.testCollection)
            .doc(userId)
            .update({ [data.id]: data })
        );
      })
    );
  }

  deleteMovie(id: string): Observable<void> {
    return this.userId$.pipe(
      first(),
      filter((userId) => userId !== undefined),
      flatMap((userId) => {
        const FieldValue = firebase.firestore.FieldValue;

        return from(
          this.angularFirestore.firestore
            .collection(environment.firebaseConfig.testCollection)
            .doc(userId)
            .update({ [id]: FieldValue.delete() })
        );
      })
    );
  }
}
