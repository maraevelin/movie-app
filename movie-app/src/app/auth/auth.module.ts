import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialDesignModule } from '../material-design/material-design.module';
import { SharedModule } from '../shared/shared.module';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ForgotPasswordComponent } from './components/account-recovery/forgot-password/forgot-password.component';

@NgModule({
  declarations: [SignInComponent, ForgotPasswordComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MaterialDesignModule,
    SharedModule,
  ],
})
export class AuthModule {}
