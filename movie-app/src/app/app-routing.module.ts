import { RouterModule, Routes } from '@angular/router';

import { MovieComponent } from './containers/movie/movie.component';
import { MoviesResolver } from './core/resolvers/movies.resolver';
import { NgModule } from '@angular/core';
import { SearchMoviesComponent } from './containers/search-movies/search-movies.component';
import { WatchListComponent } from './containers/watch-list/watch-list.component';
import { WatchListGuard } from './guards/watch-list.guard';

const routes: Routes = [
  { path: 'movies/:id', component: MovieComponent },
  {
    path: 'movies',
    component: SearchMoviesComponent,
    resolve: { moviesResolver: MoviesResolver }
  },
  {
    path: 'watchList',
    component: WatchListComponent,
    canActivate: [WatchListGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
