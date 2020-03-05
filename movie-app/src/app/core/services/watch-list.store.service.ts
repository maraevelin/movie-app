import { Injectable } from '@angular/core';
import { StoreService } from 'src/app/core/services/store.service';
import { WatchListState } from '../store/watch-list/watch-list.state';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WatchListCollection } from '../../models/watch-list-collection.model';
import { WatchListMovie } from '../../models/watch-list-movie.model';

@Injectable({ providedIn: 'root' })
export class WatchListStore extends StoreService<WatchListState> {
  public readonly store = 'WATCH LIST STORE';

  constructor() {
    super({
      isLoading: true,
      isUpdated: false,
      movies: {},
      errorMessage: undefined
    });
  }

  get isLoading$(): Observable<boolean> {
    return this.state$.pipe(map(state => state.isLoading));
  }

  get movies$(): Observable<WatchListCollection> {
    return this.state$.pipe(
      map(state => {
        const value: WatchListMovie | {} = state.isLoading ? {} : state.movies;
        return value;
      })
    );
  }

  get isEmpty$(): Observable<boolean> {
    return this.state$.pipe(
      map(state => !state.isLoading && state.movies && state.movies === {})
    );
  }

  get isUpdated$(): Observable<boolean> {
    return this.state$.pipe(map(state => state.isUpdated));
  }

  get errorMessage$(): Observable<string | undefined> {
    return this.state$.pipe(map(state => state.errorMessage));
  }
}
