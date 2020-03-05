import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchBarComponent } from './core/components/search-bar/search-bar.component';
import { GalleryComponent } from './core/components/gallery/gallery.component';
import { SearchMoviesComponent } from './core/containers/search-movies/search-movies.component';
import { MovieComponent } from './core/containers/movie/movie.component';
import { NavigationBarComponent } from './core/components/navigation-bar/navigation-bar.component';
import { MaterialDesignModule } from './material-design/material-design.module';
import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { AppState, reducers, effects } from './core/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { interceptorProviders } from './core/interceptors/interceptors';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { WatchListComponent } from './core/containers/watch-list/watch-list.component';
import { AuthModuleModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    GalleryComponent,
    SearchMoviesComponent,
    MovieComponent,
    NavigationBarComponent,
    WatchListComponent
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
