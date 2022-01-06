import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostAddEditComponent } from './post-add-edit/post-add-edit.component';
import { url } from '@interfaces/routes';

const appRoutes: Routes = [
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
