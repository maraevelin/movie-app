import { DetailedMovieResponse } from 'src/app/services/models/DetailedMovieResponse';

export class DetailedMovie {
  readonly title: string;
  readonly rating: string;
  readonly runTime: string;
  readonly posterUrl: string;
  readonly actors: string[];
  readonly writers: string[];

  constructor(source: DetailedMovieResponse) {
    this.title = source.Title;
    this.rating = source.imdbRating;
    this.runTime = source.Runtime;
    this.posterUrl = source.Poster;
    this.actors = source.Actors.split(', ');
    this.writers = source.Writer.split(', ');
  }
}
