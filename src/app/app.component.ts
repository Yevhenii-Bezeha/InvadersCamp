import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { SidebarService } from '@services/sidebar.service';
import { PostsSubjectsService } from '@services/postsSubjects.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('drawer') sidebar: MatDrawer;
  public isSideNavOpened: boolean = false;
  public error: string = '';
  private _subSidenav: Subscription;

  constructor(
    private _sidebarService: SidebarService,
    private _subjectsService: PostsSubjectsService
  ) {}

  ngOnInit(): void {
    this.isSideNavOpened = this._sidebarService.isSidenavOpened;
    this._subSidenav = this._sidebarService.isSidenavChanged$.subscribe(
      (isSideNavOpened: boolean) => {
        this.isSideNavOpened = isSideNavOpened;
      }
    );
    this._subjectsService._error.subscribe((error: string) => {
      this.error = error;
      console.log(this.error);
    });
  }

  ngOnDestroy(): void {
    this._subSidenav.unsubscribe();
  }

  onClose(): void {
    this.error = '';
  }
}
