import { WatchListResponse } from '../services/models/watch-list-response.model';
import { DetailedMovie } from './detailed-movie.model';

export enum RecommendationTypes {
  NA = 'N/A',
  RECOMMENDED = 'Recommended',
  NOT_RECOMMENDED = 'Not recommended'
}

export class WatchListMovie {
  readonly imdbId: string;
  readonly recommendation: string | undefined;
  readonly isFinished: boolean;
  readonly title: string;
  readonly posterUrl: string;
  readonly plot: string;

  constructor(movie: WatchListResponse, detailedMovie: DetailedMovie) {
    this.imdbId = movie.id;
    this.recommendation = movie.recommendation;
    this.isFinished = movie.isFinished;
    this.title = `${detailedMovie.title} (${detailedMovie.year})`;
    this.posterUrl = detailedMovie.posterUrl;
    this.plot = detailedMovie.plot;
  }
}
