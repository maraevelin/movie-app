import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignInGuard } from './guards/sign-in.guard';
import { ForgotPasswordComponent } from './components/account-recovery/forgot-password/forgot-password.component';

const routes: Routes = [
  {
    path: 'sign-in',
    component: SignInComponent,
    canActivate: [SignInGuard],
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
