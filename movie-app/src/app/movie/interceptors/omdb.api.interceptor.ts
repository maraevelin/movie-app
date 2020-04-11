import {
  HttpInterceptor,
  HttpEvent,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class OmdbApiInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let requestWithApiKey = request;
    const omdbApiUrl = environment.omdb.url;

    if (request.url.startsWith(omdbApiUrl)) {
      requestWithApiKey = request.clone({
        params: request.params.set(
          environment.omdb.paramApiKey,
          environment.omdb.apiKey
        ),
      });
    }

    return next.handle(requestWithApiKey);
  }
}
