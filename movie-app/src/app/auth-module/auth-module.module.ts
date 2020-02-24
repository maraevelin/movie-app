import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthModuleRoutingModule } from './auth-module-routing.module';
import { AuthComponent } from './components/auth/auth.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialDesignModule } from '../material-design/material-design.module';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    AuthModuleRoutingModule,
    ReactiveFormsModule,
    MaterialDesignModule
  ]
})
export class AuthModuleModule {}
