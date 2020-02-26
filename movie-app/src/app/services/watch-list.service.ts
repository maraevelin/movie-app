import { Injectable } from '@angular/core';
import { WatchListFirestoreService } from './watch-list.firestore.service';
import { WatchListStoreService } from './watch-list.store.service';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { WatchList } from './models/watch-list.model';

@Injectable({ providedIn: 'root' })
export class WatchListService {
  private readonly storeId = `[${this.store.store}]`;

  constructor(
    private firestore: WatchListFirestoreService,
    private store: WatchListStoreService
  ) {
    this.firestore
      .collection$()
      .pipe(
        tap(movies =>
          this.store.patch(
            {
              isLoading: false,
              isUpdated: false,
              movies,
              errorMessage: undefined
            },
            `${this.storeId} collection subscription`
          )
        )
      )
      .subscribe();
  }

  get isLoading$(): Observable<boolean> {
    return this.store.state$.pipe(map(state => state.isLoading));
  }

  get movies$(): Observable<WatchList[]> {
    return this.store.state$.pipe(
      map(state => (state.isLoading ? [] : state.movies))
    );
  }

  get isEmpty$(): Observable<boolean> {
    return this.store.state$.pipe(
      map(
        state => !state.isLoading && state.movies && state.movies.length === 0
      )
    );
  }

  get isUpdated$(): Observable<boolean> {
    return this.store.state$.pipe(map(state => state.isUpdated));
  }

  get errorMessage$(): Observable<string | undefined> {
    return this.store.state$.pipe(map(state => state.errorMessage));
  }

  async create(movie: WatchList) {
    const event = 'create document';

    this.handleNewAction(event);
    try {
      await this.firestore.createDoc(movie);
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
      return this.handleSuccess(event);
    } catch (error) {
      return this.handleFail(error, event);
    }
  }

  private handleNewAction(event: string) {
    this.store.patch(
      {
        isLoading: true,
        isUpdated: false,
        movies: [],
        errorMessage: undefined
      },
      `${this.storeId} ${event}`
    );
  }

  private handleSuccess(event: string) {
    this.store.patch(
      {
        isLoading: false,
        isUpdated: true
      },
      `${this.storeId} ${event} success`
    );
  }

  private handleFail(error: Error, event: string) {
    this.store.patch(
      {
        isLoading: false,
        errorMessage: error.message
      },
      `${this.storeId} ${event} fail`
    );
  }
}
