import { Component, OnInit, ViewChild, Input, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
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

import { Column } from 'src/app/core/models/column.model';
import { WatchListDataDetailed } from '../../models/watch-list-data-detailed.model';

@Component({
  selector: 'app-watch-list-table',
  templateUrl: './watch-list-table.component.html',
  styleUrls: ['./watch-list-table.component.scss'],
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
export class WatchListTableComponent implements OnInit, OnChanges {
  @Input() movies: WatchListDataDetailed[] = [];
  @Output() toggleFinished = new EventEmitter<WatchListDataDetailed>();
  @Output() remove = new EventEmitter<WatchListDataDetailed>();
  @Output() navigateTo = new EventEmitter<string>();

  dataSource = new MatTableDataSource();
  columnsToDisplay: string[] = ['title', 'isFinished', 'options'];
  columnDef: Column[] = [
    { key: 'title', header: 'Title' },
    { key: 'finished', header: 'Finished' },
    { key: '_', header: 'Options' },
  ];

  expandedElement: WatchListDataDetailed | undefined;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | undefined;
  @ViewChild(MatSort, { static: true }) sort: MatSort | undefined;

  constructor() {
  }

  ngOnInit() {
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

  ngOnChanges(changes: SimpleChanges) {
    this.dataSource.data = changes.movies.currentValue;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onToggleFinished(data: WatchListDataDetailed) {
    this.toggleFinished.emit(data);
  }

  onRemove(data: WatchListDataDetailed) {
    this.remove.emit(data);
  }

  onNavigateTo(imdbId: string) {
    this.navigateTo.emit(imdbId);
  }
}