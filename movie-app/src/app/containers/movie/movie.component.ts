import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailedMovie } from '../../models/detailed-movie.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectDetailedMovie,
  selectIsLoading,
  selectErrorMessage
} from 'src/app/store/movie/selectors/movie.selectors';
import { AppState } from 'src/app/store';
import { getDetailed } from 'src/app/store/movie/actions/movie.actions';
import { User } from 'src/app/models/user.model';
import { selectUser } from 'src/app/store/auth/selectors/auth.selectors';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  movie$?: Observable<DetailedMovie | null>;
  isLoading$: Observable<boolean>;
  errorMessage$: Observable<string | null>;
  user$: Observable<User | null>;
  isSignedIn = false;
  isOnWatchList = false;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router,
    private service: FirestoreService
  ) {
    const id: string = this.route.snapshot.paramMap.get('id') || '';
    this.store.dispatch(getDetailed({ id }));

    this.isLoading$ = this.store.select(selectIsLoading);
    this.movie$ = this.store.select(selectDetailedMovie);
    this.errorMessage$ = this.store.select(selectErrorMessage);
    this.user$ = this.store.select(selectUser);
  }

  ngOnInit() {
    this.user$.subscribe(user => (this.isSignedIn = !!user));
  }

  onAddToWatchList(movie: DetailedMovie): void {
    if (!this.isSignedIn) {
      this.router.navigate(['/auth']);
    }
    this.service.addToWatchList(movie);
    this.isOnWatchList = true;
  }

  onRemoveFromWatchList(movie: DetailedMovie): void {
    if (!this.isSignedIn) {
      this.router.navigate(['/auth']);
    }

    this.service.removeFromWatchList(movie);
    this.isOnWatchList = false;
  }
}
