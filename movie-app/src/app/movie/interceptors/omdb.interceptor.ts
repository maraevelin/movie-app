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
export class OmdbInterceptor implements HttpInterceptor {
  private readonly paramApiKey = 'apikey';

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
          this.paramApiKey,
          environment.omdb.apiKey
        ),
      });
    }

    return next.handle(requestWithApiKey);
  }
}
