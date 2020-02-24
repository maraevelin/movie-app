import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailedMovie } from '../../models/detailed-movie.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as MovieSelectors from 'src/app/store/movie/selectors/movie.selectors';
import { AppState } from 'src/app/store';
import { getDetailed } from 'src/app/store/movie/actions/movie.actions';
import { User } from 'src/app/models/user.model';
import { selectUser } from 'src/app/store/auth/selectors/auth.selectors';
import { WatchListService } from 'src/app/services/watch-list.service';
import { WatchList } from 'src/app/services/models/watch-list.model';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  id: string;
  movie$?: Observable<DetailedMovie | undefined>;
  isLoading$: Observable<boolean>;
  errorMessage$: Observable<string | undefined>;
  user$: Observable<User | undefined>;
  watchList: WatchList[] = [];
  isSignedIn = false;
  isOnWatchList = false;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router,
    private service: WatchListService
  ) {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.store.dispatch(getDetailed({ id: this.id }));

    this.isLoading$ = this.store.select(MovieSelectors.selectIsLoading);
    this.movie$ = this.store.select(MovieSelectors.selectDetailedMovie);
    this.errorMessage$ = this.store.select(MovieSelectors.selectErrorMessage);
    this.user$ = this.store.select(selectUser);
  }

  ngOnInit() {
    this.user$.subscribe(user => {
      this.isSignedIn = !!user;
    });

    if (this.isSignedIn) {
      this.service.collection$().subscribe(watchList => {
        this.watchList = watchList ? [...watchList] : [];
        this.isOnWatchList =
          !!watchList && watchList.filter(m => m.id === this.id).length > 0;
      });
    }
  }

  onAddToWatchList(movie: DetailedMovie): void {
    this.redirectVisitor();
    this.service.createDoc({
      id: movie.imdbId,
      title: movie.title,
      isSeen: false
    });
  }

  onRemoveFromWatchList(movie: DetailedMovie): void {
    this.redirectVisitor();
    this.service.removeDoc(movie.imdbId);
  }

  private redirectVisitor() {
    if (!this.isSignedIn) {
      this.router.navigate(['/auth']);
    }
  }
}
