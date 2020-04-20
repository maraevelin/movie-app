import { MovieResponse } from 'src/app/movie/services/models/movie-response.model';

export class Movie {
  readonly imdbId: string;
  readonly posterUrl: string;
  readonly title: string;

  constructor(source: MovieResponse) {
    this.imdbId = source.imdbID;
    this.posterUrl = source.Poster;
    this.title = source.Title;
  }
}
