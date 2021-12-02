import { ModalService } from '@services/modalService';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private modalService: ModalService) {}

  ngOnInit(): void {}

  onClick() {
    this.modalService.toggleSidenav();
  }

  onLogoClick() {
    this.modalService.closeSidenav();
  }
}
