import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import * as MovieStore from '../../store/movie';
import * as AuthStore from '../../../auth/store';
import * as WatchListStore from '../../../watch-list/store/';
import { AppState } from 'src/app/core/store';
import { DetailedMovie } from '../../models/detailed-movie.model';
import { AuthConstants } from 'src/app/auth/shared/auth.shared';
import { User } from 'src/app/auth/models/user.model';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogData } from 'src/app/shared/models/confirmation-dialog.model';
import { WatchListDataDetailed } from 'src/app/watch-list/models/watch-list-data-detailed.model';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit, OnDestroy {
  destroyed$: Subject<boolean>;

  id: string | null;
  isSignedIn = false;
  isOnWatchList = false;

  isLoading$: Observable<boolean>;
  movie$: Observable<DetailedMovie | undefined>;
  user$: Observable<User | undefined>;
  watchList$: Observable<Record<string, WatchListDataDetailed>>;

  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private ngZone: NgZone,
    public dialog: MatDialog
  ) {
    this.destroyed$ = new Subject<boolean>();

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.store.dispatch(MovieStore.getDetailed({ id: this.id }));
    }

    this.movie$ = this.store.select(MovieStore.selectDetailedMovie);
    this.isLoading$ = this.store.select(MovieStore.selectIsLoading);

    this.user$ = this.store.select(AuthStore.selectUser);
    this.watchList$ = this.store.select(WatchListStore.selectData);
  }

  ngOnInit(): void {
    this.user$.pipe(takeUntil(this.destroyed$)).subscribe((user) => {
      this.isSignedIn = !!user;

      if (this.isSignedIn) {
        this.watchList$.pipe(takeUntil(this.destroyed$)).subscribe({
          next: (watchListMovies) => {
            if (this.id) {
              this.isOnWatchList = watchListMovies.hasOwnProperty(this.id);
            }
          },
        });
      } else {
        this.isOnWatchList = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.unsubscribe();
  }

  onAddToWatchList(movie: DetailedMovie): void {
    if (!this.isSignedIn) {
      this.confirmRedirection();
    } else {
      this.store.dispatch(WatchListStore.addMovie({ id: movie.imdbId }));
    }
  }

  onRemoveFromWatchList(movie: DetailedMovie): void {
    if (!this.isSignedIn) {
      this.confirmRedirection();
    } else {
      this.store.dispatch(
        WatchListStore.deleteMovie({ id: movie.imdbId, title: movie.title })
      );
    }
  }

  private confirmRedirection(): void {
    const data: ConfirmationDialogData = {
      question:
        'You have to be signed in to edit your watch list. Do you want to sign in now?',
      answerYes: 'Yes',
      answerNo: 'No',
    };

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data,
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((isConfirmed) => {
        if (isConfirmed) {
          this.redirectGuest();
        }
      });
  }

  private redirectGuest(): void {
    const redirectTo: NavigationExtras = {
      queryParams: { [AuthConstants.REDIRECT_URL]: this.location.path() },
      queryParamsHandling: 'merge',
      skipLocationChange: true,
    };

    this.ngZone.run(() => {
      this.router.navigate(['/sign-in'], redirectTo);
    });
  }
}
