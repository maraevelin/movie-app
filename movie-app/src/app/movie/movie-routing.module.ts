import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MovieComponent } from './containers/movie/movie.component';
import { MoviesComponent } from './containers/movies/movies.component';
import { MoviesGuard } from './guards/movies.guard';

const routes: Routes = [
  { path: 'movies/:id', component: MovieComponent },
  {
    path: 'movies',
    component: MoviesComponent,
    canActivate: [MoviesGuard]
  },
  {
    path: '',
    redirectTo: '/movies',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieRoutingModule {}
