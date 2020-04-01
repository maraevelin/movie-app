import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SearchResponse } from './models/search-response.model';
import { DetailedMovieResponse } from './models/detailed-movie-response.model';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Movie } from '../models/movie.model';
import { DetailedMovie } from '../models/detailed-movie.model';

@Injectable({
  providedIn: 'root'
})
export class OmdbApiService {
  constructor(private http: HttpClient) {}

  searchMoviesByTitle(title: string): Observable<Movie[]> {
    const params = new HttpParams().set(environment.omdb.paramSearch, title);
    const response = this.http.get<SearchResponse>(environment.omdb.url, {
      params
    });
    return response.pipe(
      map(searchResponse => {
        if (searchResponse.Error) {
          throw new Error(searchResponse.Error);
        }

        return searchResponse.Search.filter(
          movie => movie.Poster !== 'N/A'
        ).map(movie => new Movie(movie));
      })
    );
  }

  getMovieByImdbId(
    id: string,
    plotPref: string = environment.omdb.plotPreference
  ): Observable<DetailedMovie> {
    const params = new HttpParams()
      .set(environment.omdb.paramImdbId, id)
      .set(environment.omdb.paramPlot, plotPref);
    const response = this.http.get<DetailedMovieResponse>(
      environment.omdb.url,
      { params }
    );
    return response.pipe(
      tap(movie => {
        if (movie.Error) {
          throw new Error(movie.Error);
        }
      }),
      map(movie => new DetailedMovie(movie))
    );
  }
}
