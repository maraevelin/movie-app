import { Injectable } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { WatchListState } from '../store/watch-list/watch-list.state';

@Injectable({ providedIn: 'root' })
export class WatchListStore extends StoreService<WatchListState> {
  public readonly store = 'WATCH LIST';

  constructor() {
    super({
      isLoading: true,
      isUpdated: false,
      movies: {},
      errorMessage: undefined
    });
  }
}
