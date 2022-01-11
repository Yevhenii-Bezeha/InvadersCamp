import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './posts/posts.component';
import { url } from '@interfaces/url';

const appRoutes: Routes = [
  { path: url.home, redirectTo: url.posts, pathMatch: 'full' },
  {
    path: url.posts,
    component: PostsComponent,
  },
  {
    path: url.post,
    loadChildren: () => import('./post/post.module').then((m) => m.PostModule),
  },
  {
    path: url.signin,
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
