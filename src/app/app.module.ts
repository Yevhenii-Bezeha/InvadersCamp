import { MaterialModule } from './material/material.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { ListsComponent } from './main/lists/lists.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarNavComponent } from './sidebar/sidebar-nav/sidebar-nav.component';
import { SidebarCardsComponent } from './sidebar/sidebar-cards/sidebar-cards.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, ListsComponent, FooterComponent, SidebarNavComponent, SidebarCardsComponent],
  imports: [BrowserModule, BrowserAnimationsModule, MaterialModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
