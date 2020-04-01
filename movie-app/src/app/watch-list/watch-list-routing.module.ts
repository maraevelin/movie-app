import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { WatchListComponent } from './components/watch-list/watch-list.component';
import { WatchListGuard } from './guards/watch-list.guard';

const routes: Routes = [
  {
    path: 'watchList',
    component: WatchListComponent,
    canActivate: [WatchListGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WatchListRoutingModule {}
