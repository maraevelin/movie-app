import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { SearchMoviesComponent } from './containers/search-movies/search-movies.component';
import { MovieComponent } from './containers/movie/movie.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { MaterialDesignModule } from './material-design/material-design.module';
import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { MovieReducer } from './store/movie/reducer/movie.reducer';
import { AppState } from './store/root-reducer';
import { EffectsModule } from '@ngrx/effects';
import { MovieEffects } from './store/movie/effects/movie.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AuthComponent } from './components/auth/auth.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthEffects } from './store/auth/effects/auth.effects';
import { AuthReducer } from './store/auth/reducer/auth.reducer';
import { interceptorProviders } from './interceptors/interceptors';

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
      movie: MovieReducer,
      auth: AuthReducer
    } as ActionReducerMap<AppState, any>),
    EffectsModule.forRoot([MovieEffects, AuthEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    ReactiveFormsModule
  ],
  providers: [interceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {}
