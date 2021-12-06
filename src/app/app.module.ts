import { ModalService } from '@services/modalService';
import { PostsService } from '@services/postsService';
import { MaterialModule } from '@components/material/material.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from '@components/footer/footer.component';
import { HomeModule } from './pages/home/home.module';

@NgModule({
  declarations: [AppComponent, FooterComponent],
  imports: [BrowserModule, BrowserAnimationsModule, MaterialModule, HomeModule],
  providers: [PostsService, ModalService],
  bootstrap: [AppComponent],
})
export class AppModule {}
