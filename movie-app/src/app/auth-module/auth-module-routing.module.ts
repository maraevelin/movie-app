import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { AuthResolver } from './resolvers/auth.resolver';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    resolve: { authResolver: AuthResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthModuleRoutingModule {}
