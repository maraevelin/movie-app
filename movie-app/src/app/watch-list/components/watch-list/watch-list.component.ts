import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Column } from 'src/app/core/models/column.model';
import { WatchListDataDetailed } from '../../models/watch-list-data-detailed.model';
import { AppState } from 'src/app/core/store';

import * as WatchListStore from '../../store';
import { ConfirmationDialogData } from 'src/app/shared/models/confirmation-dialog.model';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
      transition(
        'expanded <=> void',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class WatchListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator:
    | MatPaginator
    | undefined;
  @ViewChild(MatSort, { static: true }) sort: MatSort | undefined;

  columnsToDisplay: string[] = ['title', 'isFinished', 'options'];
  columnDef: Column[] = [
    { key: 'title', header: 'Title' },
    { key: 'finished', header: 'Finished' },
    { key: '_', header: 'Options' },
  ];
  dataSource = new MatTableDataSource();
  expandedElement: WatchListDataDetailed | undefined;

  isLoading$: Observable<boolean>;
  movies$: Observable<WatchListDataDetailed[]>;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private ngZone: NgZone,
    private dialog: MatDialog
  ) {
    this.isLoading$ = this.store.select(WatchListStore.selectIsLoading);
    this.movies$ = this.store.select(WatchListStore.selectDataAsArray);
  }

  ngOnInit() {
    this.movies$.subscribe({
      next: (movies) => (this.dataSource.data = movies),
      error: (error) => {
        throw Error(error);
      },
    });

    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }

    if (this.sort) {
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = (
        data: unknown | WatchListDataDetailed,
        filter: string
      ) => {
        return (
          !filter ||
          (data as WatchListDataDetailed).title.toLowerCase().includes(filter)
        );
      };
    }
  }

  toggleFinished(data: WatchListDataDetailed): void {
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

    dialogReg.afterClosed().subscribe((isConfirmed) => {
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
