import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignInGuard } from './guards/sign-in.guard';
import { RequestResetPasswordComponent } from './components/account-recovery/request-reset-password/request-reset-password.component';
import { ResetPasswordComponent } from './components/account-recovery/reset-password/reset-password.component';
import { ResetPasswordGuard } from './guards/reset-password.guard';

const routes: Routes = [
  {
    path: 'sign-in',
    component: SignInComponent,
    canActivate: [SignInGuard],
  },
  {
    path: 'forgot-password',
    component: RequestResetPasswordComponent,
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    canActivate: [ResetPasswordGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
