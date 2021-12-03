import { ModalService } from '@services/modalService';

import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('drawer') sidebar: MatDrawer;
  isShowModal = false;
  isSideNavOpened = false;

  private subModal: Subscription;
  private subSidenav: Subscription;

  constructor(private modalService: ModalService) {}

  ngOnInit() {
    this.isShowModal = this.modalService.isShowModal;
    this.subModal = this.modalService.isShowModalChanged$.subscribe(
      (isShowModal) => (this.isShowModal = isShowModal)
    );

    this.isSideNavOpened = this.modalService.isSidenavOpened;
    this.subSidenav = this.modalService.isSidenavChanged$.subscribe(
      (isSideNavOpened) => {
        this.isSideNavOpened = isSideNavOpened;
      }
    );
  }

  ngOnDestroy() {
    this.subModal.unsubscribe;
    this.subSidenav.unsubscribe();
  }
}
