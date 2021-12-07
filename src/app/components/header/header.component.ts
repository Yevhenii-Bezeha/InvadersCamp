import { ModalService } from '@services/modalService';

import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private modalService: ModalService) {}

  onClick() {
    this.modalService.toggleSidenav();
  }

  onLogoClick() {
    this.modalService.closeSidenav();
  }
}
