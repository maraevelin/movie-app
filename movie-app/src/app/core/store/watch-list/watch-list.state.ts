import { WatchListCollection } from 'src/app/core/models/watch-list-collection.model';

export interface WatchListState {
  isLoading: boolean;
  isUpdated: boolean;
  movies: WatchListCollection;
  errorMessage: string | undefined;
}
