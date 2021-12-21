import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { SidebarService } from '@services/sidebar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('drawer') sidebar: MatDrawer;
  public isSideNavOpened: boolean = false;

  private _subSidenav: Subscription;

  constructor(private _sidebarService: SidebarService) {}

  ngOnInit(): void {
    this.isSideNavOpened = this._sidebarService.isSidenavOpened;
    this._subSidenav = this._sidebarService.isSidenavChanged$.subscribe(
      (isSideNavOpened: boolean) => {
        this.isSideNavOpened = isSideNavOpened;
      }
    );
  }

  ngOnDestroy(): void {
    this._subSidenav.unsubscribe();
  }
}
