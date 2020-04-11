import {
  HttpInterceptor,
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/store';
import { error } from '../../core/store/snack-bar';

@Injectable()
export class OmdbErrorInterceptor implements HttpInterceptor {
  constructor(private store: Store<AppState>) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((event) => {
        const isOmdbRequest = request.url.startsWith(environment.omdb.url);
        if (isOmdbRequest && event instanceof HttpResponse) {
          const message = event.body.Error;

          if (message) {
            this.store.dispatch(error({ message }));
            throw Error(message);
          }
        }
      })
    );
  }
}
