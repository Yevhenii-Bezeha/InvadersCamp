import { Component } from '@angular/core';
import { SidebarService } from '@services/sidebar.service';
import { url } from '@interfaces/routes';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public url = { ...url };

  constructor(private _sidebarService: SidebarService) {}

  onClick(): void {
    this._sidebarService.toggleSidenav();
  }

  onLogoClick(): void {
    this._sidebarService.closeSidenav();
  }
}
