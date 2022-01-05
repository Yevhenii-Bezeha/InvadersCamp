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
import { PostTemplateComponent } from './components/post-template/post-template.component';
import { BaseComponent } from './classes/BaseComponent';

@NgModule({
  declarations: [
    CloseBtnComponent,
    HeaderComponent,
    FooterComponent,
    PostsFormComponent,
    ModalComponent,
    ErrorComponent,
    SpinnerComponent,
    PostTemplateComponent,
    BaseComponent,
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
    PostTemplateComponent,
    BaseComponent,
  ],
})
export class SharedModule {}
