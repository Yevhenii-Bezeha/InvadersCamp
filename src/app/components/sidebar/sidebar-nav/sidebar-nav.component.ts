import { ModalService } from '@services/modalService';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-nav',
  templateUrl: './sidebar-nav.component.html',
  styleUrls: ['./sidebar-nav.component.scss'],
})
export class SidebarNavComponent implements OnInit {
  onAddClick() {
    this.modalService.showModal();
  }

  onHomeClick() {
    this.modalService.closeSidenav();
  }
  constructor(private modalService: ModalService) {}

  ngOnInit(): void {}
}
