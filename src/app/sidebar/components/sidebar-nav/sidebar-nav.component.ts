import { Component } from '@angular/core';
import { SidebarService } from '@services/sidebar.service';
import { Router } from '@angular/router';
import { FormService } from '@services/form.service';
import { url } from '@interfaces/routes';

@Component({
  selector: 'app-sidebar-nav',
  templateUrl: './sidebar-nav.component.html',
  styleUrls: ['./sidebar-nav.component.scss'],
})
export class SidebarNavComponent {
  constructor(
    private _sidebarService: SidebarService,
    private _router: Router,
    private _formService: FormService
  ) {}

  onAddClick(): void {
    this._sidebarService.closeSidenav();
    this._formService.openAddForm();
  }

  onHomeClick(): void {
    this._sidebarService.closeSidenav();
    this._router.navigateByUrl(url.posts).then();
  }
}
