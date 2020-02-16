import {
  HttpInterceptor,
  HttpEvent,
  HttpRequest,
  HttpHandler
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable()
export class OmdbInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const omdbApiUrl = environment.omdbApiUrl;

    if (req.url.startsWith(omdbApiUrl)) {
      const request = req.clone({
        params: req.params.set(
          environment.omdbApiKeyParam,
          environment.omdbApiKey
        )
      });
      return next.handle(request);
    }

    return next.handle(req);
  }
}
