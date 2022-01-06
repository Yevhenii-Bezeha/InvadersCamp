import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material/material.module';
import { PostsComponent } from './posts.component';

import { RouterModule } from '@angular/router';
import { PostsRoutingModule } from './posts.routing.module';
import { SharedModule } from '../shared/shared.module';
import { ListPostsComponent } from './components/list-posts/list-posts.component';
import { FormsModule } from '@angular/forms';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { SortComponent } from './components/sort/sort.component';
import { FilterComponent } from './components/filter/filter.component';

@NgModule({
  declarations: [
    PostsComponent,
    ListPostsComponent,
    PaginatorComponent,
    SortComponent,
    FilterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    RouterModule,
    SharedModule,
    PostsRoutingModule,
  ],
  exports: [PostsComponent],
})
export class PostsModule {}
