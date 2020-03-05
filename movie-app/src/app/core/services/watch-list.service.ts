import { Injectable } from '@angular/core';
import { WatchListFirestore } from './watch-list.firestore.service';
import { WatchListStore } from './watch-list.store.service';
import { tap } from 'rxjs/operators';
import { WatchListResponse } from './models/watch-list-response.model';
import { WatchListCollection } from '../../models/watch-list-collection.model';
import { OmdbApiService } from './omdb-api.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { selectUser } from '../../auth/store/selectors/auth.selectors';
import { WatchListMovie } from '../../models/watch-list-movie.model';
import { Observable, forkJoin } from 'rxjs';
import { DetailedMovie } from '../../models/detailed-movie.model';

@Injectable({ providedIn: 'root' })
export class WatchListService {
  private readonly storeId = `[${this.watchListStore.store}]`;

  constructor(
    private firestore: WatchListFirestore,
    private watchListStore: WatchListStore,
    private omdbService: OmdbApiService,
    private store: Store<AppState>
  ) {
    this.store.select(selectUser).subscribe({
      next: user => {
        if (user) {
          this.firestore
            .collection$()
            .pipe(
              tap(watchList => {
                if (!watchList || !watchList.length) {
                  this.watchListStore.patch(
                    {
                      isLoading: false,
                      isUpdated: false,
                      movies: {},
                      errorMessage: undefined
                    },
                    `${this.storeId} collection subscription`
                  );
                } else {
                  const collection: WatchListCollection = {};

                  const detailedMovies$: Observable<DetailedMovie>[] = [];

                  watchList.forEach(movie => {
                    collection[movie.id] = new WatchListMovie(movie);
                    detailedMovies$.push(
                      this.omdbService.getMovieByImdbId(movie.id, 'short')
                    );
                  });

                  forkJoin(detailedMovies$).subscribe(result => {
                    result.forEach(movie => {
                      collection[movie.imdbId] = {
                        ...collection[movie.imdbId],
                        title: movie.title,
                        posterUrl: movie.posterUrl,
                        plot: movie.plot
                      };
                    });

                    this.watchListStore.patch(
                      {
                        isLoading: false,
                        isUpdated: false,
                        movies: collection,
                        errorMessage: undefined
                      },
                      `${this.storeId} collection subscription`
                    );
                  });
                }
              })
            )
            .subscribe();
        }
      },
      error: error => console.log(error),
      complete: () => console.log('user$ subscription complete')
    });
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
