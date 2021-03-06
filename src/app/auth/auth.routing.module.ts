import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { url } from '../core/models/url';

const appRoutes: Routes = [
  {
    path: url.home,
    component: AuthComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
