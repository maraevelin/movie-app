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
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const firebaseApiURl = environment.firebaseApiUrl;

    if (req.url.startsWith(firebaseApiURl)) {
      const request = req.clone({
        params: req.params
          .set(environment.firebaseApiKeyParam, environment.firebaseApiKey)
          .set(
            environment.firebaseParamReturnSecureTokenParam,
            environment.firebaseParamReturnSecureToken
          )
      });
      return next.handle(request);
    }

    return next.handle(req);
  }
}
