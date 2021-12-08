import { ModalService } from '@services/modalService';

import { Component } from '@angular/core';
import { SidebarService } from '@services/sidebarService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    private _modalService: ModalService,
    private _sidebarService: SidebarService
  ) {}

  onClick() {
    this._sidebarService.toggleSidenav();
  }

  onLogoClick() {
    this._sidebarService.closeSidenav();
  }
}
