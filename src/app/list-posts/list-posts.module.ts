import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material/material.module';
import { ListPostsComponent } from './list-posts.component';
import { PostItemComponent } from './components/post-item/post-item.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ListPostsComponent, PostItemComponent],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [ListPostsComponent],
})
export class ListPostsModule {}
