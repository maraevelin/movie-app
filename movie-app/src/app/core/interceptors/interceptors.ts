import { Provider } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { OmdbInterceptor } from './omdb.interceptor';
import { AuthInterceptor } from '../../auth/interceptors/auth.interceptor';

export const interceptorProviders: Provider[] = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: OmdbInterceptor,
    multi: true
  }
];
