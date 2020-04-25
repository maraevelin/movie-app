import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WatchListRoutingModule } from './watch-list-routing.module';
import { WatchListComponent } from './containers/watch-list/watch-list.component';
import { MaterialDesignModule } from '../material-design/material-design.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    WatchListComponent
  ],
  imports: [
    CommonModule,
    WatchListRoutingModule,
    MaterialDesignModule,
    SharedModule
  ],
})
export class WatchListModule {}
