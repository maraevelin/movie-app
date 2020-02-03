import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SearchResponse } from './models/SearchResponse';
import { DetailedMovie } from './models/DetailedMovie';

@Injectable({
  providedIn: 'root'
})
export class OmdbApiService {

  constructor(private http: HttpClient) { }

  getMovies(title: string) {
    const params = new HttpParams()
      .set(environment.omdbParamSearch, title);
    return this.http.get<SearchResponse>(environment.omdbApiUrl, { params });
  }

  getMovie(id: string) {
    const params = new HttpParams()
      .set(environment.omdbParamImdbID, id)
      .set(environment.omdbParamPlot, environment.omdbPlot);
    return this.http.get<DetailedMovie>(environment.omdbApiUrl, { params });
  }
}
