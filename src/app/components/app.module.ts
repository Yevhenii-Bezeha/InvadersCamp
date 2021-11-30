import { PostsService } from './../services/postsService';
import { MaterialModule } from './material/material.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { ListComponent } from './main/list/list.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarNavComponent } from './sidebar/sidebar-nav/sidebar-nav.component';
import { SidebarCardsComponent } from './sidebar/sidebar-cards/sidebar-cards.component';
import { ListItemComponent } from './main/list/list-item/list-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarNavComponent,
    SidebarCardsComponent,
    ListItemComponent,
    ListComponent,
  ],
  imports: [BrowserModule, BrowserAnimationsModule, MaterialModule],
  providers: [PostsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
