import { DetailedMovieResponse } from 'src/app/core/services/models/detailed-movie-response.model';

export class DetailedMovie {
  readonly imdbId: string;
  readonly title: string;
  readonly year: string;
  readonly rating: string;
  readonly runTime: string;
  readonly posterUrl: string;
  readonly actors: string[];
  readonly writers: string[];
  readonly plot: string;

  constructor(source: DetailedMovieResponse) {
    this.imdbId = source.imdbID;
    this.title = source.Title;
    this.year = source.Year;
    this.rating = source.imdbRating;
    this.runTime = source.Runtime;
    this.posterUrl = source.Poster;
    this.actors = source.Actors.split(', ');
    this.writers = source.Writer.split(', ');
    this.plot = source.Plot;
  }
}
