import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostAddEditComponent } from './components/post-add-edit/post-add-edit.component';
import { url } from '@interfaces/routes';
import { PostItemComponent } from './components/post-item/post-item.component';

const appRoutes: Routes = [
  {
    path: url.post,
    component: PostItemComponent,
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
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule],
})
export class PostRoutingModule {}
