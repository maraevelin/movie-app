import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WatchListService } from 'src/app/services/watch-list.service';
import { WatchListCollection } from 'src/app/models/watch-list-collection.model';
import { WatchListMovie } from 'src/app/models/watch-list-movie';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.scss']
})
export class WatchListComponent implements OnInit {
  isLoading$: Observable<boolean>;
  isUpdated$: Observable<boolean>;
  isEmpty$: Observable<boolean>;
  errorMessage$: Observable<string | undefined>;
  movies$: Observable<WatchListCollection>;

  constructor(private service: WatchListService) {
    this.isLoading$ = this.service.isLoading$;
    this.isUpdated$ = this.service.isUpdated$;
    this.isEmpty$ = this.service.isEmpty$;
    this.errorMessage$ = this.service.errorMessage$;
    this.movies$ = this.service.movies$;
  }

  ngOnInit() {}

  onFinished(movie: WatchListMovie): void {
    movie = { ...movie, isFinished: !movie.isFinished };
    this.service.update(movie);
  }

  onRemove(movie: WatchListMovie): void {
    this.service.remove(movie.imdbId);
  }
}
