import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieComponent } from './containers/movie/movie.component';
import { SearchMoviesComponent } from './containers/search-movies/search-movies.component';
import { MoviesResolver } from './resolvers/movies.resolver';

const routes: Routes = [
  { path: 'movies/:id', component: MovieComponent },
  {
    path: 'movies',
    component: SearchMoviesComponent,
    resolve: { moviesResolver: MoviesResolver }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
