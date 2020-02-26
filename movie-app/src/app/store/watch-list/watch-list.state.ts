import { WatchList } from '../../services/models/watch-list.model';

export interface WatchListState {
  isLoading: boolean;
  isUpdated: boolean;
  movies: WatchList[];
  errorMessage: string | undefined;
}
