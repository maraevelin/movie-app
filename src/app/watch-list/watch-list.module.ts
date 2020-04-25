import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WatchListRoutingModule } from './watch-list-routing.module';
import { WatchListComponent } from './containers/watch-list/watch-list.component';
import { MaterialDesignModule } from '../material-design/material-design.module';
import { SharedModule } from '../shared/shared.module';
import { WatchListTableComponent } from './components/watch-list-table/watch-list-table.component';

@NgModule({
  declarations: [
    WatchListComponent,
    WatchListTableComponent
  ],
  imports: [
    CommonModule,
    WatchListRoutingModule,
    MaterialDesignModule,
    SharedModule
  ],
})
export class WatchListModule {}
