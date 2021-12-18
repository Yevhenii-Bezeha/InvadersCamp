import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostComponent } from '../post/post.component';

const appRoutes: Routes = [
  {
    path: 'posts/:id',
    component: PostComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule],
})
export class ListPostsRoutingModule {}
