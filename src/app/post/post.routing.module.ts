import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostAddEditComponent } from './components/post-add-edit/post-add-edit.component';
import { url } from '@interfaces/url';
import { PostComponent } from './post.component';

export const routesPost: Routes = [
  {
    path: url.post,
    component: PostComponent,
  },
  {
    path: url.addPost,
    component: PostAddEditComponent,
  },
  {
    path: url.editPost,
    component: PostAddEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routesPost)],
  exports: [RouterModule],
})
export class PostRoutingModule {}
