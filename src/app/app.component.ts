import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { SidebarService } from '@services/sidebar.service';
import { ErrorsService } from '@services/errors.service';
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
  private subSidenav: Subscription;

  constructor(
    private sidebarService: SidebarService,
    private subjectsService: ErrorsService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.subSidenav = this.sidebarService.isSidenavChanged$.subscribe(
      (isSideNavOpened: boolean) => {
        this.isSideNavOpened = isSideNavOpened;
      }
    );
    this.subjectsService.error.subscribe((error: any) => {
      this.error = error.message || error;
      console.log(this.error);
    });
  }

  ngOnDestroy(): void {
    this.subSidenav.unsubscribe();
  }

  onClose(): void {
    this.error = '';
    this.route.navigateByUrl('/').then();
  }
}
