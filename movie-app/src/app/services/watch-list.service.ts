import { Injectable } from '@angular/core';
import { WatchListFirestore } from './watch-list.firestore.service';
import { WatchListStore } from './watch-list.store.service';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { WatchListResponse } from './models/watch-list-response.model';
import { WatchListCollection } from '../models/watch-list-collection.model';
import { OmdbApiService } from './omdb-api.service';
import { DetailedMovie } from '../models/detailed-movie.model';
import { Store } from '@ngrx/store';
import { AppState } from '../store';
import { selectUser } from '../auth-module/store/auth/selectors/auth.selectors';
import { WatchListMovie } from '../models/watch-list-movie';

@Injectable({ providedIn: 'root' })
export class WatchListService {
  private readonly storeId = `[${this.watchListStore.store}]`;
  private watchListCollection: WatchListCollection = {};

  constructor(
    private firestore: WatchListFirestore,
    private watchListStore: WatchListStore,
    private omdbService: OmdbApiService,
    private store: Store<AppState>
  ) {
    this.store.select(selectUser).subscribe({
      next: user => {
        if (user) {
          this.initCollection();
        }
      }
    });
  }

  private initCollection() {
    this.firestore
      .collection$()
      .pipe(
        tap(movies => {
          this.setWatchListCollection(movies);

          this.resetState();
        })
      )
      .subscribe();
  }

  private setWatchListCollection(
    movies: WatchListResponse[] | undefined
  ): void {
    if (!movies || movies.length === 0) {
      this.watchListCollection = {};
      return;
    }

    movies.forEach(movie => {
      if (!this.watchListCollection.hasOwnProperty(movie.id)) {
        this.omdbService.getMovieByImdbId(movie.id).subscribe({
          next: detailedMovie => {
            this.addMovieToWatchList(movie, detailedMovie);
          },
          error: (error: Error) => console.log(error),
          complete: () => {}
        });
      }
    });
  }

  private updateWatchListCollection(movie: WatchListMovie) {
    this.watchListCollection[movie.imdbId] = {
      ...movie
    };
  }

  private resetState() {
    this.watchListStore.patch(
      {
        isLoading: false,
        isUpdated: false,
        movies: this.watchListCollection,
        errorMessage: undefined
      },
      `${this.storeId} collection subscription`
    );
  }

  private addMovieToWatchList(
    movie: WatchListResponse,
    detailedMovie: DetailedMovie
  ) {
    this.watchListCollection[movie.id] = {
      imdbId: movie.id,
      recommendation: movie.recommendation,
      isFinished: movie.isFinished,
      title: detailedMovie.title,
      year: detailedMovie.year,
      posterUrl: detailedMovie.posterUrl
    };
  }

  get isLoading$(): Observable<boolean> {
    return this.watchListStore.state$.pipe(map(state => state.isLoading));
  }

  get movies$(): Observable<WatchListCollection> {
    return this.watchListStore.state$.pipe(
      map(state => (state.isLoading ? {} : state.movies))
    );
  }

  get isEmpty$(): Observable<boolean> {
    return this.watchListStore.state$.pipe(
      map(state => !state.isLoading && state.movies && state.movies === {})
    );
  }

  get isUpdated$(): Observable<boolean> {
    return this.watchListStore.state$.pipe(map(state => state.isUpdated));
  }

  get errorMessage$(): Observable<string | undefined> {
    return this.watchListStore.state$.pipe(map(state => state.errorMessage));
  }

  async create(movie: WatchListResponse) {
    const event = 'create document';

    this.handleNewAction(event);
    try {
      await this.firestore.createDoc(movie);
      return this.handleSuccess(event);
    } catch (error) {
      return this.handleFail(error, event);
    }
  }

  async update(movie: WatchListMovie) {
    const event = 'update document';

    this.handleNewAction(event);
    try {
      await this.firestore.updateDoc({
        id: movie.imdbId,
        isFinished: movie.isFinished,
        recommendation: movie.recommendation || ''
      });
      this.updateWatchListCollection(movie);
      return this.handleSuccess(event);
    } catch (error) {
      return this.handleFail(error, event);
    }
  }

  async remove(id: string) {
    const event = 'remove document';

    this.handleNewAction(event);
    try {
      await this.firestore.removeDoc(id);
      delete this.watchListCollection[id];
      return this.handleSuccess(event);
    } catch (error) {
      return this.handleFail(error, event);
    }
  }

  private handleNewAction(event: string) {
    this.watchListStore.patch(
      {
        isLoading: true,
        isUpdated: false,
        errorMessage: undefined
      },
      `${this.storeId} ${event}`
    );
  }

  private handleSuccess(event: string) {
    this.watchListStore.patch(
      {
        isLoading: false,
        isUpdated: true
      },
      `${this.storeId} ${event} success`
    );

    setTimeout(() => {
      this.watchListStore.patch(
        {
          isUpdated: false
        },
        `${this.storeId} ${event} reset updated status`
      );
    }, 2000);
  }

  private handleFail(error: Error, event: string) {
    this.watchListStore.patch(
      {
        isLoading: false,
        errorMessage: error.message
      },
      `${this.storeId} ${event} fail`
    );
  }
}
