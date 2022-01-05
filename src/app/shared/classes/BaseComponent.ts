import { Subscription } from 'rxjs';
import { Component, OnDestroy } from '@angular/core';

@Component({
  template: '',
})
export class BaseComponent implements OnDestroy {
  subscriptions: Subscription[] = [];

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  addObserver(subscription: Subscription) {
    this.subscriptions.push(subscription);
  }
}
