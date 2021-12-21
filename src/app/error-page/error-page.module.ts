import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorPageComponent } from './error-page.component';
import { SharedModule } from '../shared/shared.module';
import { ErrorPageRoutingModule } from './error-page.routing.module';

@NgModule({
  declarations: [ErrorPageComponent],
  imports: [CommonModule, SharedModule, ErrorPageRoutingModule],
})
export class ErrorPageModule {}
