import { ModalService } from '@services/modalService';
import { PostsService } from '@services/postsService';
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
import { ModalComponent } from './modal/modal.component';
import { FormComponent } from './form/form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarNavComponent,
    SidebarCardsComponent,
    ListItemComponent,
    ListComponent,
    ModalComponent,
    FormComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [PostsService, ModalService],
  bootstrap: [AppComponent],
})
export class AppModule {}
