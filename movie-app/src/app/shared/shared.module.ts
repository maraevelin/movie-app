import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { MaterialDesignModule } from '../material-design/material-design.module';

@NgModule({
  declarations: [SpinnerComponent],
  imports: [CommonModule, MaterialDesignModule],
  exports: [SpinnerComponent]
})
export class SharedModule {}
