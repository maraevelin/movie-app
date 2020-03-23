import { RouterModule, Routes } from '@angular/router';

import { MovieComponent } from './core/containers/movie/movie.component';
import { NgModule } from '@angular/core';
import { MoviesComponent } from './core/containers/movies/movies.component';
import { WatchListComponent } from './core/containers/watch-list/watch-list.component';
import { WatchListGuard } from './core/guards/watch-list.guard';
import { MoviesGuard } from './core/guards/movies.guard';

const routes: Routes = [
  { path: 'movies/:id', component: MovieComponent },
  {
    path: 'movies',
    component: MoviesComponent,
    canActivate: [MoviesGuard]
  },
  {
    path: 'watchList',
    component: WatchListComponent,
    canActivate: [WatchListGuard]
  },
  {
    path: '',
    redirectTo: '/movies',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
