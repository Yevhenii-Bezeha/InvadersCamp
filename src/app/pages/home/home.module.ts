import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { MaterialModule } from '@components/material/material.module';
import { SidebarComponent } from '@components/sidebar/sidebar.component';
import { HeaderComponent } from '@components/header/header.component';
import { ListComponent } from '@components/list/list.component';
import { ModalComponent } from '@components/modal/modal.component';
import { SidebarNavComponent } from '@components/sidebar/sidebar-nav/sidebar-nav.component';
import { SidebarCardsComponent } from '@components/sidebar/sidebar-cards/sidebar-cards.component';
import { ListItemComponent } from '@components/list/list-item/list-item.component';
import { FormComponent } from '@components/form/form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent,
    SidebarComponent,
    HeaderComponent,
    ListComponent,
    ModalComponent,
    SidebarNavComponent,
    SidebarCardsComponent,
    ListItemComponent,
    FormComponent,
  ],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  exports: [HomeComponent],
})
export class HomeModule {}
