import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CloseBtnComponent } from './close-btn/close-btn.component';
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [CloseBtnComponent],
  imports: [CommonModule, MaterialModule],
  exports: [CloseBtnComponent],
})
export class SharedModule {}
