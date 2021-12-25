import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material/material.module';
import { PostsComponent } from './posts.component';

import { RouterModule } from '@angular/router';
import { PostsRoutingModule } from './posts.routing.module';
import { SharedModule } from '../shared/shared.module';
import { ListPostsComponent } from './components/list-posts/list-posts.component';

@NgModule({
  declarations: [PostsComponent, ListPostsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    SharedModule,
    PostsRoutingModule,
  ],
  exports: [PostsComponent],
})
export class PostsModule {}