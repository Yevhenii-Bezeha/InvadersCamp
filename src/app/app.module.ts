import { ModalService } from '@services/modal.service';
import { PostsService } from '@services/posts.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from '@components/footer/footer.component';
import { SidebarService } from '@services/sidebar.service';
import { AppRoutingModule } from './app.routing.module';
import { LoginModule } from './pages/login/login.module';
import { SidebarComponent } from '@components/sidebar/sidebar.component';
import { ModalComponent } from '@components/modal/modal.component';
import { SidebarNavComponent } from '@components/sidebar/sidebar-nav/sidebar-nav.component';
import { SidebarCardsComponent } from '@components/sidebar/sidebar-cards/sidebar-cards.component';
import { ArticleFormComponent } from '@components/article-form/article-form.component';
import { MaterialModule } from './shared/material/material.module';
import { HeaderComponent } from '@components/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { SignupModule } from './pages/signup/signup.module';
import { HomeModule } from './pages/home/home.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    ModalComponent,
    SidebarNavComponent,
    SidebarCardsComponent,
    ArticleFormComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    LoginModule,
    HomeModule,
    SignupModule,
  ],
  providers: [
    PostsService,
    ModalService,
    SidebarService,
    { provide: 'Window', useValue: window },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
