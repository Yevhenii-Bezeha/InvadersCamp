import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { SidebarNavComponent } from './components/sidebar-nav/sidebar-nav.component';
import { SidebarCardsComponent } from './components/sidebar-cards/sidebar-cards.component';
import { MaterialModule } from '../shared/material/material.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SidebarComponent, SidebarNavComponent, SidebarCardsComponent],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [SidebarComponent],
})
export class SidebarModule {}
