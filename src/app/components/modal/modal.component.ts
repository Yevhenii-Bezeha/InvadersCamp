import { ModalService } from './../../services/modalService';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit, OnDestroy {
  handleBackdropClick(e: MouseEvent) {
    if (e.target !== e.currentTarget) return;
    this.modalService.showModal();
  }

  onEsc = (e: KeyboardEvent) => {
    if (e.code === 'Escape') {
      this.modalService.showModal();
      this.modalService.closeSidenav();
    }
  };

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    window.addEventListener('keydown', this.onEsc);
  }

  ngOnDestroy() {
    window.removeEventListener('keydown', this.onEsc);
  }
}
