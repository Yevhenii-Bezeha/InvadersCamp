import { Component, OnDestroy, OnInit } from '@angular/core';
import { SidebarService } from '@services/sidebar.service';
import { url } from '@interfaces/url';
import { publicRoutes } from '@interfaces/routes';
import { LocalStorageService } from '@services/localStorage.service';
import { HttpAuthService } from '@services/http-auth.service';
import { AuthService } from '@services/auth.service';
import { BaseComponent } from '../../classes/BaseComponent';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  public url = { ...url };
  public publicRoutes = [...publicRoutes];
  public isPrivate: boolean = false;

  constructor(
    private sidebarService: SidebarService,
    private localStorageService: LocalStorageService,
    private httpAuthService: HttpAuthService,
    private authService: AuthService,
    private route: Router
  ) {
    super();
  }

  ngOnInit(): void {
    super.addObserver(
      this.authService.Auth$.subscribe((isAuthenticated) => {
        this.isPrivate = isAuthenticated;
      })
    );
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  onClick(): void {
    this.sidebarService.toggleSidenav();
  }

  onLogoClick(): void {
    this.sidebarService.closeSidenav();
  }

  onLogoutClick(): void {
    console.log(123);
    this.httpAuthService.logout().subscribe();
    this.localStorageService.deleteItems();
    this.authService.removeAuth();
    this.route.navigateByUrl(url.home).then();
  }
}
