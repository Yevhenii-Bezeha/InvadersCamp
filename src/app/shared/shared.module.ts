import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CloseBtnComponent } from './components/close-btn/close-btn.component';
import { MaterialModule } from './material/material.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PostsFormComponent } from './components/posts-form/posts-form.component';
import { ModalComponent } from './components/modal/modal.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorComponent } from './components/error/error.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [
    CloseBtnComponent,
    HeaderComponent,
    FooterComponent,
    PostsFormComponent,
    ModalComponent,
    ErrorComponent,
    SpinnerComponent,
  ],
  imports: [CommonModule, MaterialModule, RouterModule, ReactiveFormsModule],
  exports: [
    CloseBtnComponent,
    MaterialModule,
    HeaderComponent,
    FooterComponent,
    PostsFormComponent,
    ModalComponent,
    SpinnerComponent,
    ErrorComponent,
  ],
})
export class SharedModule {}
