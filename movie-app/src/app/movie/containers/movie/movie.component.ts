import * as MovieSelectors from 'src/app/movie/store/movie/selectors/movie.selectors';

import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Component, OnInit, NgZone } from '@angular/core';

import { AppState } from 'src/app/core/store';
import { DetailedMovie } from '../../models/detailed-movie.model';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { User } from 'src/app/auth/models/user.model';
import { getDetailed } from 'src/app/movie/store/movie/actions/movie.actions';
import { selectUser } from 'src/app/auth/store/selectors/auth.selectors';
import { AuthConstants } from 'src/app/auth/shared/auth.shared';
import { WatchListService } from 'src/app/watch-list/services/watch-list.service';
import { WatchListCollection } from 'src/app/watch-list/models/watch-list-collection.model';
import { WatchListStore } from 'src/app/watch-list/services/watch-list.store.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogData } from 'src/app/shared/models/confirmation-dialog.model';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {
  id: string;
  movie$?: Observable<DetailedMovie | undefined>;
  isLoading$: Observable<boolean>;
  user$: Observable<User | undefined>;
  isSignedIn = false;

  movies$: Observable<WatchListCollection>;
  isOnWatchList = false;

  constructor(
    private store: Store<AppState>,
    private watchListStore: WatchListStore,
    private service: WatchListService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private ngZone: NgZone,
    public dialog: MatDialog
  ) {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.store.dispatch(getDetailed({ id: this.id }));
    this.movie$ = this.store.select(MovieSelectors.selectDetailedMovie);
    this.isLoading$ = this.store.select(MovieSelectors.selectIsLoading);

    this.user$ = this.store.select(selectUser);
    this.movies$ = this.watchListStore.movies$;
  }

  ngOnInit() {
    this.user$.subscribe((user) => {
      this.isSignedIn = !!user;

      if (this.isSignedIn) {
        this.watchListStore.movies$.subscribe({
          next: (movies) => {
            this.isOnWatchList = movies.hasOwnProperty(this.id);
          },
        });
      } else {
        this.isOnWatchList = false;
      }
    });
  }

  onAddToWatchList(movie: DetailedMovie): void {
    if (!this.isSignedIn) {
      this.confirmRedirection();
    } else {
      this.service.create({
        id: movie.imdbId,
        isFinished: false,
        recommendation: '',
      });
    }
  }

  onRemoveFromWatchList(movie: DetailedMovie): void {
    if (!this.isSignedIn) {
      this.confirmRedirection();
    } else {
      this.service.remove(movie.imdbId);
    }
  }

  private confirmRedirection(): void {
    const data: ConfirmationDialogData = {
      question:
        'You have to be signed in to edit your watch list. Do you want to be redirected to sign in?',
      answerYes: 'Yes',
      answerNo: 'No, continue as guest',
    };

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '325px',
      minHeight: 'max-content',
      data,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.redirectGuest();
      }
    });
  }

  private redirectGuest() {
    const redirectTo: NavigationExtras = {
      queryParams: { [AuthConstants.REDIRECT_URL]: this.location.path() },
      queryParamsHandling: 'merge',
      skipLocationChange: true,
    };

    this.ngZone.run(() => {
      this.router.navigate(['/auth'], redirectTo);
    });
  }
}
