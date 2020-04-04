import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieRoutingModule } from './movie-routing.module';
import { ConfirmationDialogComponent } from '../shared/components/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, MovieRoutingModule],
  entryComponents: [ConfirmationDialogComponent],
})
export class MovieModule {}
