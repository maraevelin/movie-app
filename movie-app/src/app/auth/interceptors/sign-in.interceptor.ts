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
export class SignInInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let request = req;
    const firebaseApiURl = environment.firebase.url;

    if (req.url.startsWith(firebaseApiURl)) {
      request = req.clone({
        params: req.params
          .set('key', environment.firebase.apiKey)
          .set('returnSecureToken', 'true'),
      });
    }

    return next.handle(request);
  }
}
