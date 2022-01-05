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

  constructor(private sidebarService: SidebarService) {}

  onClick(): void {
    this.sidebarService.toggleSidenav();
  }

  onLogoClick(): void {
    this.sidebarService.closeSidenav();
  }
}
