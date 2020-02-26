import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WatchList } from 'src/app/services/models/watch-list.model';
import { WatchListService } from 'src/app/services/watch-list.service';

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
  movies$: Observable<WatchList[]>;

  constructor(private service: WatchListService) {
    this.isLoading$ = this.service.isLoading$;
    this.isUpdated$ = this.service.isUpdated$;
    this.isEmpty$ = this.service.isEmpty$;
    this.errorMessage$ = this.service.errorMessage$;
    this.movies$ = this.service.movies$;
  }

  ngOnInit() {}
}
