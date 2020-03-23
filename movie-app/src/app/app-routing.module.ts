import { RouterModule, Routes } from '@angular/router';

import { MovieComponent } from './core/containers/movie/movie.component';
import { NgModule } from '@angular/core';
import { SearchMoviesComponent } from './core/containers/search-movies/search-movies.component';
import { WatchListComponent } from './core/containers/watch-list/watch-list.component';
import { WatchListGuard } from './core/guards/watch-list.guard';

const routes: Routes = [
  { path: 'movies/:id', component: MovieComponent },
  {
    path: 'movies',
    component: SearchMoviesComponent
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
