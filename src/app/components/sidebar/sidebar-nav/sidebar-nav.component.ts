import { ModalService } from '@services/modalService';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar-nav',
  templateUrl: './sidebar-nav.component.html',
  styleUrls: ['./sidebar-nav.component.scss'],
})
export class SidebarNavComponent {
  constructor(private modalService: ModalService) {}

  onAddClick() {
    this.modalService.showModal();
  }

  onHomeClick() {
    this.modalService.closeSidenav();
  }
}
