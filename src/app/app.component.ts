import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { ModalService } from '@services/modal.service';
import { SidebarService } from '@services/sidebar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('drawer') sidebar: MatDrawer;
  public isShowModal = false;
  public isSideNavOpened = false;

  private subModal: Subscription;
  private subSidenav: Subscription;

  constructor(
    private _modalService: ModalService,
    private _sidebarService: SidebarService
  ) {}

  ngOnInit() {
    this.isShowModal = this._modalService.isShowModal;
    this.subModal = this._modalService.isShowModalChanged$.subscribe(
      (isShowModal) => (this.isShowModal = isShowModal)
    );

    this.isSideNavOpened = this._sidebarService.isSidenavOpened;
    this.subSidenav = this._sidebarService.isSidenavChanged$.subscribe(
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
