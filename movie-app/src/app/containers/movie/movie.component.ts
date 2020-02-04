import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailedMovie } from '../../services/models/DetailedMovie';
import { OmdbApiService } from '../../services/omdb-api.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  id: string = null;
  movie: DetailedMovie;
  error: string = null;

  constructor(
    private route: ActivatedRoute,
    private service: OmdbApiService,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.service.getMovie(this.id).subscribe((data: DetailedMovie) => {
      if (data.Response === 'False') {
        this.error = data.Error;
        return;
      }
      this.movie = data;
    });
  }

}
