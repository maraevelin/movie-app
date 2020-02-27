import { WatchListMovie } from 'src/app/models/watch-list-movie';

export interface WatchListCollection {
  [id: string]: WatchListMovie;
}
