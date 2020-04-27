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
import * as SnackBarStore from '../../core/store/snack-bar';
import * as MovieStore from '../../movie/store/movie';

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
          const message = event.body.Error as string;

          if (message) {
            const notFoundByTitle = message
              .toLowerCase()
              .startsWith('movie not found');

            if (notFoundByTitle) {
              this.store.dispatch(MovieStore.searchSuccess({ movies: [] }));
            } else {
              this.store.dispatch(SnackBarStore.error({ message }));
              throw Error(message);
            }
          }
        }
      })
    );
  }
}
