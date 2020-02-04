import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OmdbApiService } from '../../services/omdb-api.service';
import { DetailedMovie } from '../../models/DetailedMovie';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  id: string | null = null;
  movie$?: Observable<DetailedMovie>;

  constructor(
    private route: ActivatedRoute,
    private service: OmdbApiService,
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.movie$ = this.service.getMovie(this.id);
    }
  }

}
