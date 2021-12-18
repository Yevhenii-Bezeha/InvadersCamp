import { ModalService } from '@services/modal.service';
import { Component } from '@angular/core';
import { SidebarService } from '@services/sidebar.service';
import { FormService } from '@services/form.service';

@Component({
  selector: 'app-sidebar-nav',
  templateUrl: './sidebar-nav.component.html',
  styleUrls: ['./sidebar-nav.component.scss'],
})
export class SidebarNavComponent {
  constructor(
    private _modalService: ModalService,
    private _sidebarService: SidebarService,
    private _formService: FormService
  ) {}

  onAddClick() {
    this._formService.openCreateForm();
    this._modalService.toggleModal();
  }

  onHomeClick() {
    this._sidebarService.closeSidenav();
  }
}
