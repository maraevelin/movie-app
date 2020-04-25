import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { WatchListGuard } from './guards/watch-list.guard';
import { WatchListComponent } from './containers/watch-list/watch-list.component';

const routes: Routes = [
  {
    path: 'watch-list',
    component: WatchListComponent,
    canActivate: [WatchListGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WatchListRoutingModule {}
