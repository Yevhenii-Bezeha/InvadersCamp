import { ModalService } from './../services/modalService';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('drawer') sidebar: MatDrawer;
  isShowModal = false;

  constructor(private modalService: ModalService) {}

  ngOnInit() {
    this.isShowModal = this.modalService.isShowModal;
    this.modalService.isShowModalChanged.subscribe((isShowModal) => {
      this.isShowModal = isShowModal;
    });
  }
}
