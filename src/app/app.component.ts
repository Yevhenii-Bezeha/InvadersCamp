import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { SidebarService } from '@services/sidebar.service';
import { ErrorsService } from '@services/errors.service';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { LocalStorageService } from '@services/localStorage.service';
import { BaseComponent } from './shared/classes/BaseComponent';
import { HttpAuthService } from '@services/http-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends BaseComponent implements OnInit, OnDestroy {
  @ViewChild('drawer') sidebar: MatDrawer;
  public isSideNavOpened: boolean = false;
  public error: string = '';

  constructor(
    private sidebarService: SidebarService,
    private subjectsService: ErrorsService,
    private route: Router,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private httpAuthService: HttpAuthService
  ) {
    super();
  }

  ngOnInit(): void {
    super.addObserver(
      this.sidebarService.isSidenavChanged$.subscribe(
        (isSideNavOpened: boolean) => {
          this.isSideNavOpened = isSideNavOpened;
        }
      )
    );
    super.addObserver(
      this.subjectsService.error.subscribe((error: any) => {
        this.error = error.error.message || error;
        console.log(this.error);
      })
    );
    this.checkAuth();
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  checkAuth(): void {
    const userId = this.localStorageService.getUser();
    const token = this.localStorageService.getToken();
    if (!userId && !token) {
      this.authService.removeAuth();
      return;
    }
    this.httpAuthService.refresh().subscribe(
      (data: any) => {
        this.localStorageService.setToken(data.accessToken);
        this.localStorageService.setUser(data);
        this.authService.addAuth();
      },
      (error: any) => {
        this.authService.removeAuth();
      }
    );
  }

  onClose(): void {
    this.error = '';
    this.route.navigateByUrl('/').then();
  }
}
