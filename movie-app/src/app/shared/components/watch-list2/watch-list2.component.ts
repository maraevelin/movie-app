import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AppState } from 'src/app/core/store';
import { Store } from '@ngrx/store';

import * as WatchListActions from '../../../watch-list/store/actions/watch-list.actions';
import { selectData, WatchList2Data } from 'src/app/watch-list/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-watch-list2',
  templateUrl: './watch-list2.component.html',
  styleUrls: ['./watch-list2.component.scss'],
})
export class WatchList2Component {
  id = new FormControl('imdbId3');
  isFinished = new FormControl(false);
  data$: Observable<WatchList2Data[]>;

  constructor(private store: Store<AppState>) {
    this.data$ = this.store.select(selectData);
  }

  add() {
    const data = {
      id: this.id.value,
      isFinished:
        ('' + this.isFinished.value).toLowerCase() === 'false' ? false : true,
    };
    this.store.dispatch(WatchListActions.addMovie({ data }));
  }

  update() {
    const data = {
      id: this.id.value,
      isFinished:
        ('' + this.isFinished.value).toLowerCase() === 'false' ? false : true,
    };
    this.store.dispatch(WatchListActions.updateMovie({ data }));
  }

  delete() {
    const id = this.id.value;
    this.store.dispatch(WatchListActions.deleteMovie({ id }));
  }

  load() {
    this.store.dispatch(WatchListActions.load());
  }
}
