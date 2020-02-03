import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchMoviesComponent } from './search-movies/search-movies.component';
import { MovieComponent } from './movie/movie.component';


const routes: Routes = [
  { path: 'movies/:id', component: MovieComponent },
  { path: 'movies', component: SearchMoviesComponent},
//  { path: '', redirectTo: '/movies', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
