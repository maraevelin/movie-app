import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { WatchListService } from 'src/app/services/watch-list.service';
import { WatchListCollection } from 'src/app/models/watch-list-collection.model';
import { WatchListMovie } from 'src/app/models/watch-list-movie';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
import { Column } from 'src/app/models/column.model';

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
      )
    ])
  ]
})
export class WatchListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator:
    | MatPaginator
    | undefined;
  @ViewChild(MatSort, { static: true }) sort: MatSort | undefined;

  columnsToDisplay: string[] = ['title'];
  columnDef: Column[] = [{ key: 'title', header: 'Title' }];
  dataSource = new MatTableDataSource();
  expandedElement: WatchListMovie | undefined;

  movies: WatchListMovie[] = [];
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

  ngOnInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }

    if (this.sort) {
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = (
        data: unknown | WatchListMovie,
        filter: string
      ) => {
        return (
          !filter ||
          (data as WatchListMovie).title.toLowerCase().includes(filter)
        );
      };
    }

    this.movies$.subscribe({
      next: movies => {
        this.movies = [];
        Object.keys(movies).map(key => this.movies.push(movies[key]));
        this.dataSource.data = this.movies;
      },
      error: error => console.log(error),
      complete: () => console.log('movies$ subscription complete')
    });
  }

  toggleFinished(movie: WatchListMovie): void {
    movie = { ...movie, isFinished: !movie.isFinished };
    this.service.update(movie);
  }

  onRemove(imdbId: string): void {
    this.service.remove(imdbId);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
