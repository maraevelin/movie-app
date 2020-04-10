import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { MaterialDesignModule } from '../material-design/material-design.module';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [SpinnerComponent, ConfirmationDialogComponent],
  imports: [CommonModule, MaterialDesignModule, ReactiveFormsModule],
  exports: [SpinnerComponent, ConfirmationDialogComponent],
})
export class SharedModule {}
