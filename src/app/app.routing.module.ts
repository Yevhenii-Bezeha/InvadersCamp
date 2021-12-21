import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPostsComponent } from './list-posts/list-posts.component';
import { url } from '@interfaces/routes';
import { PostComponent } from './post/post.component';

const appRoutes: Routes = [
  { path: url.home, redirectTo: url.posts, pathMatch: 'full' },
  {
    path: url.posts,
    component: ListPostsComponent,
  },
  {
    path: url.post,
    component: PostComponent,
  },
  {
    path: url.login,
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: url.signup,
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: url.error,
    loadChildren: () =>
      import('./error-page/error-page.module').then((m) => m.ErrorPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
