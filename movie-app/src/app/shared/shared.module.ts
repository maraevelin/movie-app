import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { MaterialDesignModule } from '../material-design/material-design.module';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { WatchList2Component } from './components/watch-list2/watch-list2.component';

@NgModule({
  declarations: [
    SpinnerComponent,
    ConfirmationDialogComponent,
    WatchList2Component,
  ],
  imports: [CommonModule, MaterialDesignModule, ReactiveFormsModule],
  exports: [SpinnerComponent, ConfirmationDialogComponent],
})
export class SharedModule {}
