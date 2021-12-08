import { ModalService } from '@services/modal.service';
import { PostsService } from '@services/posts.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from '@components/footer/footer.component';
import { HomeModule } from './pages/home/home.module';
import { SidebarService } from '@services/sidebar.service';

@NgModule({
  declarations: [AppComponent, FooterComponent],
  imports: [BrowserModule, BrowserAnimationsModule, HomeModule],
  providers: [PostsService, ModalService, SidebarService],
  bootstrap: [AppComponent],
})
export class AppModule {}
