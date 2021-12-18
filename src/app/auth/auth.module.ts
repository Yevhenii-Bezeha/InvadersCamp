import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material/material.module';
import { AuthComponent } from './auth.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AuthComponent, LoginFormComponent, SignupFormComponent],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, RouterModule],
  exports: [],
})
export class AuthModule {}