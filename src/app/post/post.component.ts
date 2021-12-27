import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  constructor(private _location: Location) {}

  onClickBack(): void {
    this._location.back();
  }
}
