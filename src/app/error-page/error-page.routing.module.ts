import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { url } from '../core/models/routes';
import { ErrorPageComponent } from './error-page.component';

const appRoutes: Routes = [
  {
    path: url.home,
    component: ErrorPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule],
})
export class ErrorPageRoutingModule {}
