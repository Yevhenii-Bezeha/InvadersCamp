import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit, OnDestroy {
  constructor(
    private location: Location,
    @Inject('Window') private window: Window
  ) {}

  ngOnInit(): void {
    this.window.addEventListener('keydown', this.onEsc.bind(this));
  }

  ngOnDestroy(): void {
    this.window.removeEventListener('keydown', this.onEsc);
  }

  handleBackdropClick(e: MouseEvent): void {
    if (e.target === e.currentTarget) {
      this.location.back();
    }
  }

  onEsc(e: KeyboardEvent): void {
    if (e.code === 'Escape') {
      this.location.back();
    }
  }
}
