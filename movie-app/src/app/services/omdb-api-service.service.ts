import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OmdbApiServiceService {

  constructor(private http: HttpClient) { }

  getMovies(title: string) {
    const params = new HttpParams()
      .set(environment.omdbParamTitle, title)
      .set(environment.omdbParamPlot, environment.omdbPlot);
    return this.http.get(environment.omdbApiUrl, { params });
  }
}
