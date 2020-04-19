import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SearchResponse } from './models/search-response.model';
import { DetailedMovieResponse } from './models/detailed-movie-response.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Movie } from '../models/movie.model';
import { DetailedMovie } from '../models/detailed-movie.model';

@Injectable({
  providedIn: 'root',
})
export class OmdbService {
  private readonly paramSearch = 's';
  private readonly paramPlot = 'plot';
  private readonly paramImdbId = 'i';
  private readonly plotPreference = 'full';

  constructor(private http: HttpClient) {}

  searchMoviesByTitle(title: string): Observable<Movie[]> {
    const params = new HttpParams().set(this.paramSearch, title);
    const response$ = this.http.get<SearchResponse>(environment.omdb.url, {
      params,
    });
    return response$.pipe(
      map((searchResponse) => {
        const moviesWithPoster = searchResponse.Search.filter(
          (movie) => movie.Poster !== 'N/A'
        );
        return moviesWithPoster.map((movie) => new Movie(movie));
      })
    );
  }

  getMovieByImdbId(
    id: string,
    plotPref: string = this.plotPreference
  ): Observable<DetailedMovie> {
    const params = new HttpParams()
      .set(this.paramImdbId, id)
      .set(this.paramPlot, plotPref);
    const response$ = this.http.get<DetailedMovieResponse>(
      environment.omdb.url,
      { params }
    );
    return response$.pipe(map((movie) => new DetailedMovie(movie)));
  }
}
