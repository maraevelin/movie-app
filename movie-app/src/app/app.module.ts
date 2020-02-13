import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { SearchMoviesComponent } from './containers/search-movies/search-movies.component';
import { MovieComponent } from './containers/movie/movie.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { MaterialDesignModule } from './material-design/material-design.module';
import { OmdbInterceptor } from './interceptors/OmdbInterceptor';
import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { MovieReducer } from './store/movie/reducer/movie.reducer';
import { AppState } from './store/root-reducer';
import { EffectsModule } from '@ngrx/effects';
import { MovieEffects } from './store/movie/effects/movie.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AuthComponent } from './components/auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    GalleryComponent,
    SearchMoviesComponent,
    MovieComponent,
    NavigationBarComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialDesignModule,
    HttpClientModule,
    StoreModule.forRoot({
      movie: MovieReducer
    } as ActionReducerMap<AppState, any>),
    EffectsModule.forRoot([MovieEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: OmdbInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
