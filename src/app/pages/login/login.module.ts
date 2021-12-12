import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from '@components/login-form/login-form.component';
import { MaterialModule } from '../../shared/material/material.module';

@NgModule({
  declarations: [LoginComponent, LoginFormComponent],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  exports: [LoginComponent],
})
export class LoginModule {}
