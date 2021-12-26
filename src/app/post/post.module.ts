import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material/material.module';
import { PostComponent } from './post.component';

import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { PostAddEditComponent } from './components/post-add-edit/post-add-edit.component';
import { PostRoutingModule } from './post.routing.module';
import { PostItemComponent } from './components/post-item/post-item.component';
import { CommentsComponent } from './components/comments/comments.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PostComponent,
    PostAddEditComponent,
    PostItemComponent,
    CommentsComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    MaterialModule,
    SharedModule,
    RouterModule,
    PostRoutingModule,
  ],
  exports: [],
})
export class PostModule {}
