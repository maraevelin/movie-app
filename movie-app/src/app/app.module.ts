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
import { AppState, reducers, effects } from './store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { interceptorProviders } from './interceptors/interceptors';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AuthModuleModule } from './auth-module/auth-module.module';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    GalleryComponent,
    SearchMoviesComponent,
    MovieComponent,
    NavigationBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialDesignModule,
    HttpClientModule,
    StoreModule.forRoot(reducers as ActionReducerMap<AppState, any>),
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AuthModuleModule
  ],
  providers: [...interceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {}
