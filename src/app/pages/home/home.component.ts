import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { ModalService } from '@services/modalService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('drawer') sidebar: MatDrawer;
  public isShowModal = false;
  public isSideNavOpened = false;

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
    this.subModal.unsubscribe();
    this.subSidenav.unsubscribe();
  }
}
