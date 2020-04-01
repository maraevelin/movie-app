import { WatchListCollection } from 'src/app/watch-list/models/watch-list-collection.model';

export interface WatchListState {
  isLoading: boolean;
  isUpdated: boolean;
  movies: WatchListCollection;
  errorMessage: string | undefined;
}
