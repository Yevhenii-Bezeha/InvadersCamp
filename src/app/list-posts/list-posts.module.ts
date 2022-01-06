import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material/material.module';
import { ListPostsComponent } from './list-posts.component';
import { PostItemComponent } from './components/post-item/post-item.component';
import { RouterModule } from '@angular/router';
import { ListPostsRoutingModule } from './list-posts.routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ListPostsComponent, PostItemComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    SharedModule,
    ListPostsRoutingModule,
  ],
  exports: [ListPostsComponent],
})
export class ListPostsModule {}
