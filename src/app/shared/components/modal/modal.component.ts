import { ModalService } from '../../../core/services/modal.service';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { SidebarService } from '../../../core/services/sidebar.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit, OnDestroy {
  constructor(
    private _modalService: ModalService,
    private _sidebarService: SidebarService,
    @Inject('Window') private _window: Window
  ) {}

  ngOnInit(): void {
    this._window.addEventListener('keydown', this.onEsc);
  }

  ngOnDestroy() {
    this._window.removeEventListener('keydown', this.onEsc);
  }

  handleBackdropClick(e: MouseEvent) {
    if (e.target !== e.currentTarget) return;
    this._modalService.toggleModal();
  }

  onEsc = (e: KeyboardEvent) => {
    if (e.code === 'Escape') {
      this._modalService.toggleModal();
      this._sidebarService.closeSidenav();
    }
  };
}
