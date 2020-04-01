import { WatchListMovie } from 'src/app/watch-list/models/watch-list-movie.model';

export interface WatchListCollection {
  [id: string]: WatchListMovie;
}
