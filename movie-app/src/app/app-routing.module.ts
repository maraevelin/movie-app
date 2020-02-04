import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieComponent } from './containers/movie/movie.component';
import { SearchMoviesComponent } from './containers/search-movies/search-movies.component';


const routes: Routes = [
  { path: 'movies/:id', component: MovieComponent },
  { path: 'movies', component: SearchMoviesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
