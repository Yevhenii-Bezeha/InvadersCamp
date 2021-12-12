import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material/material.module';
import { SignupFormComponent } from '@components/signup-form/signup-form.component';

@NgModule({
  declarations: [SignupComponent, SignupFormComponent],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  exports: [SignupComponent],
})
export class SignupModule {}
