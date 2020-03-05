import { MovieResponse } from 'src/app/core/services/models/movie-response.model';

export class Movie {
  readonly imdbId: string;
  readonly posterUrl: string;

  constructor(source: MovieResponse) {
    this.imdbId = source.imdbID;
    this.posterUrl = source.Poster;
  }
}
