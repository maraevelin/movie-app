import { WatchListMovie } from 'src/app/models/watch-list-movie.model';

export interface WatchListCollection {
  [id: string]: WatchListMovie;
}
