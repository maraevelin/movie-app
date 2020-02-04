import { MovieResponse } from 'src/app/services/models/MovieResponse';

export class Movie {
  readonly imdbId: string;
  readonly posterUrl: string;

  constructor(source: MovieResponse) {
    this.imdbId = source.imdbID;
    this.posterUrl = source.Poster;
  }
}
