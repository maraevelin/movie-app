import { WatchListMovie } from 'src/app/core/models/watch-list-movie.model';

export interface WatchListCollection {
  [id: string]: WatchListMovie;
}
