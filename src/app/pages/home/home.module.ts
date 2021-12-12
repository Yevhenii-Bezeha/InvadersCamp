import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../shared/material/material.module';
import { HomeComponent } from './home.component';
import { PostsComponent } from '@components/posts/posts.component';
import { PostItemComponent } from '@components/posts/post-item/post-item.component';
import { PostComponent } from '@components/post/post.component';
import { RouterModule } from '@angular/router';
import { HomeRoutingModule } from './home.routing.module';

@NgModule({
  declarations: [
    HomeComponent,
    PostsComponent,
    PostItemComponent,
    PostComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    HomeRoutingModule,
    RouterModule,
  ],
  exports: [],
})
export class HomeModule {}
