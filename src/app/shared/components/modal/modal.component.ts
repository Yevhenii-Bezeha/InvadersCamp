import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit, OnDestroy {
  constructor(
    private _location: Location,
    @Inject('Window') private _window: Window
  ) {}

  ngOnInit(): void {
    this._window.addEventListener('keydown', this.onEsc.bind(this));
  }

  ngOnDestroy(): void {
    this._window.removeEventListener('keydown', this.onEsc);
  }

  handleBackdropClick(e: MouseEvent): void {
    if (e.target === e.currentTarget) {
      this._location.back();
    }
  }

  onEsc(e: KeyboardEvent): void {
    if (e.code === 'Escape') {
      this._location.back();
    }
  }
}
