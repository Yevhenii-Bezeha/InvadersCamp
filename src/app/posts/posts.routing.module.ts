import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { url } from '@interfaces/url';
import { ListPostsComponent } from './components/list-posts/list-posts.component';

const appRoutes: Routes = [
  {
    path: url.posts,
    component: ListPostsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {}
