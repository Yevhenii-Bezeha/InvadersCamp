import { ModalService } from '@services/modalService';
import { Component } from '@angular/core';
import { SidebarService } from '@services/sidebarService';

@Component({
  selector: 'app-sidebar-nav',
  templateUrl: './sidebar-nav.component.html',
  styleUrls: ['./sidebar-nav.component.scss'],
})
export class SidebarNavComponent {
  constructor(
    private _modalService: ModalService,
    private _sidebarService: SidebarService
  ) {}

  onAddClick() {
    this._modalService.toggleModal();
  }

  onHomeClick() {
    this._sidebarService.closeSidenav();
  }
}
