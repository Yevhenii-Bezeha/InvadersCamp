import { Component, OnDestroy, OnInit } from '@angular/core';
import { SidebarService } from '@services/sidebar.service';
import { Router } from '@angular/router';
import { FormService } from '@services/form.service';
import { url } from '@interfaces/url';
import { BaseComponent } from '../../../shared/classes/BaseComponent';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-sidebar-nav',
  templateUrl: './sidebar-nav.component.html',
  styleUrls: ['./sidebar-nav.component.scss'],
})
export class SidebarNavComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  private isAuthenticated: boolean = false;

  constructor(
    private _sidebarService: SidebarService,
    private _router: Router,
    private _formService: FormService,
    private authService: AuthService,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.checkAuth();
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  checkAuth(): void {
    super.addObserver(
      this.authService.Auth$.subscribe((isAuthenticated: boolean) => {
        this.isAuthenticated = isAuthenticated;
      })
    );
  }

  onAddClick(): void {
    if (!this.isAuthenticated) {
      this._sidebarService.closeSidenav();
      this.router.navigateByUrl(url.signin).then();
      return;
    }
    this._sidebarService.closeSidenav();
    this._formService.openAddForm();
  }

  onHomeClick(): void {
    this._sidebarService.closeSidenav();
    this._router.navigateByUrl(url.posts).then();
  }
}
