import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { SidebarService } from '@services/sidebar.service';
import { PostsSubjectsService } from '@services/postsSubjects.service';
import { Router } from '@angular/router';

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
    private _subjectsService: PostsSubjectsService,
    private _route: Router
  ) {}

  ngOnInit(): void {
    this._subSidenav = this._sidebarService.isSidenavChanged$.subscribe(
      (isSideNavOpened: boolean) => {
        this.isSideNavOpened = isSideNavOpened;
      }
    );
    this._subjectsService._error.subscribe((error: any) => {
      this.error = error.message || error;
      console.log(this.error);
    });
  }

  ngOnDestroy(): void {
    this._subSidenav.unsubscribe();
  }

  onClose(): void {
    this.error = '';
    this._route.navigateByUrl('/').then();
  }
}
