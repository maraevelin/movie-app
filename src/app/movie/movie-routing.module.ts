import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MovieComponent } from './containers/movie/movie.component';
import { MoviesComponent } from './containers/movies/movies.component';
import { MoviesResolver } from './resolvers/movies.resolver';

const routes: Routes = [
  { path: 'movies/:id', component: MovieComponent },
  {
    path: 'movies',
    component: MoviesComponent,
    resolve: { moviesResolver: MoviesResolver },
  },
  {
    path: '',
    redirectTo: '/movies',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovieRoutingModule {}
