export interface WatchListMovie {
  [imdbId: string]: {
    isFinished: boolean;
    rating: string;
    title: string;
  };
}
