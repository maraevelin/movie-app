import { Component, NgZone, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { WatchListDataDetailed } from '../../models/watch-list-data-detailed.model';
import { AppState } from 'src/app/core/store';

import * as WatchListStore from '../../store';
import { ConfirmationDialogData } from 'src/app/shared/models/confirmation-dialog.model';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.scss'],
})
export class WatchListComponent implements OnDestroy {
  destroyed$: Subject<boolean>;
  isLoading$: Observable<boolean>;
  movies$: Observable<WatchListDataDetailed[]>;
  isEmpty$: Observable<boolean>;
  isPopulated$: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private ngZone: NgZone,
    private dialog: MatDialog
  ) {
    this.destroyed$ = new Subject<boolean>();
    this.isLoading$ = this.store.select(WatchListStore.selectIsLoading);
    this.movies$ = this.store.select(WatchListStore.selectDataAsArray);
    this.isEmpty$ = this.store.select(WatchListStore.selectIsEmpty);
    this.isPopulated$ = this.store.select(WatchListStore.selectIsPopulated);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.unsubscribe();
  }

  onToggleFinished(data: WatchListDataDetailed): void {
    this.store.dispatch(WatchListStore.updateMovie({ data }));
  }

  onRemove(dataDetailed: WatchListDataDetailed): void {
    const data: ConfirmationDialogData = {
      question: `You are about to remove ${dataDetailed.title} from your watch list. Are you sure?`,
      answerYes: 'Yes',
      answerNo: 'No',
    };

    const dialogReg = this.dialog.open(ConfirmationDialogComponent, {
      data,
    });

    dialogReg
      .afterClosed()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((isConfirmed) => {
        if (isConfirmed) {
          this.store.dispatch(
            WatchListStore.deleteMovie({
              id: dataDetailed.id,
              title: dataDetailed.title,
            })
          );
        }
      });
  }

  onNavigateToMovie(imdbId: string): void {
    this.ngZone.run(() => {
      this.router.navigate([`movies/${imdbId}`]);
    });
  }
}
