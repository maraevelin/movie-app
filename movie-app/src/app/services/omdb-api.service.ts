import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SearchResponse } from './models/SearchResponse';
import { DetailedMovieResponse } from './models/DetailedMovieResponse';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Movie } from '../models/Movie';
import { DetailedMovie } from '../models/DetailedMovie';
import { MovieResponse } from './models/MovieResponse';

@Injectable({
  providedIn: 'root'
})
export class OmdbApiService {

  constructor(private http: HttpClient) { }

  getMovies(title: string): Observable<Movie[]> {
    const params = new HttpParams().set(environment.omdbParamSearch, title);
    const response = this.http.get<SearchResponse>(environment.omdbApiUrl, { params });
    return response.pipe(
      map(searchResponse => searchResponse.Search.reduce((movies: Movie[], movie: MovieResponse) => {
        return (movie.Poster === 'N/A') ? movies : [...movies, new Movie(movie)];
      }, []))
    );
  }

  getMovie(id: string): Observable<DetailedMovie> {
    const params = new HttpParams()
      .set(environment.omdbParamImdbID, id)
      .set(environment.omdbParamPlot, environment.omdbPlot);
    const response = this.http.get<DetailedMovieResponse>(environment.omdbApiUrl, { params });
    return response.pipe(map(movie => new DetailedMovie(movie)));
  }
}
