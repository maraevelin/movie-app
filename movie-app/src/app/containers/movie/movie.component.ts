import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OmdbApiService } from '../../services/omdb-api.service';
import { DetailedMovie } from '../models/DetailedMovie';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  id: string = null;
  movie: DetailedMovie;

  constructor(
    private route: ActivatedRoute,
    private service: OmdbApiService,
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.service.getMovie(this.id).subscribe(movie => this.movie = movie);
  }

}
