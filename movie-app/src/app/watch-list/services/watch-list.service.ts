import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, from, forkJoin, of } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import * as firebase from 'firebase/app';

import { environment } from 'src/environments/environment';
import { DetailedMovie } from 'src/app/movie/models/detailed-movie.model';
import { OmdbApiService } from 'src/app/movie/services/omdb-api.service';
import { WatchListData } from '../models/watch-list-data.model';
import { WatchListDataDetailed } from '../models/watch-list-data-detailed.model';

@Injectable({ providedIn: 'root' })
export class WatchListService {
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
    private omdbService: OmdbApiService
  ) {}

  load(): Observable<Record<string, WatchListDataDetailed>> {
    return from(
      this.angularFirestore.firestore
        .collection(environment.firebaseConfig.testCollection)
        .doc(environment.firebaseConfig.testDocument)
        .withConverter(this.converter)
        .get()
    ).pipe(
      concatMap((doc) => {
        const data = doc.data();

        if (data === undefined) {
          throw Error('Error getting document: ');
        }

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
  }

  addMovie(id: string): Observable<WatchListDataDetailed> {
    const data = { id, isFinished: false };

    return from(
      this.angularFirestore
        .collection(environment.firebaseConfig.testCollection)
        .doc(environment.firebaseConfig.testDocument)
        .set({ [data.id]: data }, { merge: true })
    ).pipe(() => {
      if (data.id.startsWith('tt')) {
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
      }
      const now = new Date();
      const timestamp = `${now.getFullYear()}.${now.getMonth()}.${now.getDay()}. ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
      return of({
        id: data.id,
        isFinished: data.isFinished,
        title: 'testTitle' + timestamp,
        plot: 'testPlot',
        posterUrl: 'testPosterUrl',
      });
    });
  }

  updateMovie(dataDetailed: WatchListDataDetailed): Observable<void> {
    const data = { id: dataDetailed.id, isFinished: dataDetailed.isFinished };

    return from(
      this.angularFirestore.firestore
        .collection(environment.firebaseConfig.testCollection)
        .doc(environment.firebaseConfig.testDocument)
        .update({ [data.id]: data })
    );
  }

  deleteMovie(id: string): Observable<void> {
    if (id === undefined) {
      throw Error('Error deleting movie!');
    }

    const FieldValue = firebase.firestore.FieldValue;

    return from(
      this.angularFirestore.firestore
        .collection(environment.firebaseConfig.testCollection)
        .doc(environment.firebaseConfig.testDocument)
        .update({ [id]: FieldValue.delete() })
    );
  }
}
