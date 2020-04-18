import { Provider } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SignInInterceptor } from 'src/app/auth/interceptors/sign-in.interceptor';
import { OmdbApiInterceptor } from '../../movie/interceptors/omdb.api.interceptor';
import { OmdbErrorInterceptor } from '../../movie/interceptors/omdb.error.interceptor';

export const interceptorProviders: Provider[] = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: SignInInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: OmdbApiInterceptor,
    multi: true,
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: OmdbErrorInterceptor,
    multi: true,
  },
];
