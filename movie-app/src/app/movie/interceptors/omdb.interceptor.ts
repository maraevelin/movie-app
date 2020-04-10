import {
  HttpInterceptor,
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/store';
import { notify, SnackBarCSS } from '../../core/store/snack-bar';

@Injectable()
export class OmdbInterceptor implements HttpInterceptor {
  constructor(private store: Store<AppState>) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let request = req;
    const omdbApiUrl = environment.omdb.url;

    if (req.url.startsWith(omdbApiUrl)) {
      request = req.clone({
        params: req.params.set(
          environment.omdb.paramApiKey,
          environment.omdb.apiKey
        ),
      });
    }

    return next.handle(request).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          const message = event.body.Error;

          if (message) {
            this.store.dispatch(
              notify({ message, cssClass: SnackBarCSS.error })
            );
          }

          return of(event);
        }
      })
    );
  }
}
