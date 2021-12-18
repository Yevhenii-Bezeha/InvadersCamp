import { Component } from '@angular/core';
import { ModalService } from '../../../core/services/modal.service';

@Component({
  selector: 'app-close-btn',
  templateUrl: './close-btn.component.html',
  styleUrls: ['./close-btn.component.scss'],
})
export class CloseBtnComponent {
  constructor(private _modalService: ModalService) {}

  onCloseClick() {
    this._modalService.toggleModal();
  }
}
