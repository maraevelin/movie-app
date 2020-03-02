import { Injectable } from '@angular/core';
import { WatchListFirestore } from './watch-list.firestore.service';
import { WatchListStore } from './watch-list.store.service';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { WatchListResponse } from './models/watch-list-response.model';
import { WatchListCollection } from '../models/watch-list-collection.model';
import { OmdbApiService } from './omdb-api.service';
import { Store } from '@ngrx/store';
import { AppState } from '../store';
import { selectUser } from '../auth-module/store/auth/selectors/auth.selectors';
import { WatchListMovie } from '../models/watch-list-movie.model';

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
        console.log(user);
        if (user) {
          this.firestore
            .collection$()
            .pipe(
              tap(movies => {
                this.setWatchListCollection(movies).then(() => {
                  this.watchListStore.patch(
                    {
                      isLoading: false,
                      isUpdated: false,
                      movies: this.watchListCollection,
                      errorMessage: undefined
                    },
                    `${this.storeId} collection subscription`
                  );
                });
              })
            )
            .subscribe();
        }
      },
      error: error => console.log(error),
      complete: () => console.log('user$ subscription complete')
    });
  }

  private async setWatchListCollection(
    movies: WatchListResponse[] | undefined
  ): Promise<void> {
    if (!movies || movies.length === 0) {
      this.watchListCollection = {};
      return;
    }

    for (const movie of movies) {
      if (!this.watchListCollection[movie.id]) {
        await this.omdbService
          .getMovieByImdbId(movie.id, 'short')
          .toPromise()
          .then(detailedMovie => {
            this.watchListCollection[movie.id] = new WatchListMovie(
              movie,
              detailedMovie
            );
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }

  get isLoading$(): Observable<boolean> {
    return this.watchListStore.state$.pipe(map(state => state.isLoading));
  }

  get movies$(): Observable<WatchListCollection> {
    return this.watchListStore.state$.pipe(
      map(state => {
        const value: WatchListMovie | {} = state.isLoading ? {} : state.movies;
        return value;
      })
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

    this.updateStateOnNewEvent(event);
    try {
      await this.firestore.createDoc(movie);
      return this.updateStateOnSuccess(event);
    } catch (error) {
      return this.updateStateOnFail(error, event);
    }
  }

  async update(movie: WatchListMovie) {
    const event = 'update document';

    this.updateStateOnNewEvent(event);
    try {
      await this.firestore.updateDoc({
        id: movie.imdbId,
        isFinished: movie.isFinished,
        recommendation: movie.recommendation || ''
      });
      this.watchListCollection[movie.imdbId] = {
        ...movie
      };
      return this.updateStateOnSuccess(event);
    } catch (error) {
      return this.updateStateOnFail(error, event);
    }
  }

  async remove(id: string) {
    const event = 'remove document';

    this.updateStateOnNewEvent(event);
    try {
      await this.firestore.removeDoc(id);
      delete this.watchListCollection[id];
      return this.updateStateOnSuccess(event);
    } catch (error) {
      return this.updateStateOnFail(error, event);
    }
  }

  private updateStateOnNewEvent(event: string) {
    this.watchListStore.patch(
      {
        isLoading: true,
        isUpdated: false,
        errorMessage: undefined
      },
      `${this.storeId} ${event}`
    );
  }

  private updateStateOnSuccess(event: string) {
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
    }, 1000);
  }

  private updateStateOnFail(error: Error, event: string) {
    this.watchListStore.patch(
      {
        isLoading: false,
        errorMessage: error.message
      },
      `${this.storeId} ${event} fail`
    );
  }
}
