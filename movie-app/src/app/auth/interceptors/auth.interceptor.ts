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
    let request = req;
    const firebaseApiURl = environment.firebaseOld.url;

    if (req.url.startsWith(firebaseApiURl)) {
      request = req.clone({
        params: req.params
          .set(
            environment.firebaseOld.paramApiKey,
            environment.firebaseOld.apiKey
          )
          .set(
            environment.firebaseOld.paramReturnSecureTokenParam,
            environment.firebaseOld.returnSecureTokenPreference
          )
      });
    }

    return next.handle(request);
  }
}
