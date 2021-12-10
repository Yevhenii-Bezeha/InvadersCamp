import { Component, OnInit } from '@angular/core';
import { ModalService } from '@services/modal.service';

@Component({
  selector: 'app-close-btn',
  templateUrl: './close-btn.component.html',
  styleUrls: ['./close-btn.component.scss'],
})
export class CloseBtnComponent implements OnInit {
  constructor(private _modalService: ModalService) {}

  ngOnInit(): void {}

  onCloseClick() {
    this._modalService.toggleModal();
  }
}
