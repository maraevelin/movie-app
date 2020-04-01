import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MoviesGuard } from './core/guards/movies.guard';
import { MoviesComponent } from './core/containers/movies/movies.component';
import { MovieComponent } from './core/containers/movie/movie.component';

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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
