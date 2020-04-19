import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialDesignModule } from '../material-design/material-design.module';
import { SharedModule } from '../shared/shared.module';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { RequestResetPasswordComponent } from './components/account-recovery/request-reset-password/request-reset-password.component';
import { ResetPasswordComponent } from './components/account-recovery/reset-password/reset-password.component';

@NgModule({
  declarations: [
    SignInComponent,
    RequestResetPasswordComponent,
    ResetPasswordComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MaterialDesignModule,
    SharedModule,
  ],
})
export class AuthModule {}
