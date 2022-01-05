import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-close-btn',
  templateUrl: './close-btn.component.html',
  styleUrls: ['./close-btn.component.scss'],
})
export class CloseBtnComponent {
  constructor(private location: Location) {}

  onCloseClick() {
    this.location.back();
  }
}
