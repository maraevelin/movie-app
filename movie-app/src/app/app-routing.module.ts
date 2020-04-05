import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { WatchList2Component } from './shared/components/watch-list2/watch-list2.component';

const routes: Routes = [
  {
    path: 'watchList2',
    component: WatchList2Component,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
