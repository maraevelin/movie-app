import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './components/auth/auth.component';
import { AuthResolver } from './resolvers/auth.resolver';
import { NgModule } from '@angular/core';

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
