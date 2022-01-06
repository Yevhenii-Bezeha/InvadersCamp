import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { SortData } from '@interfaces/SortData';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss'],
})
export class SortComponent {
  @Output() getSortData = new EventEmitter<SortData>();
  private sortBy: string;
  private order: number;

  constructor() {}

  onSort(event: MatButtonToggleChange): void {
    if (event.value === 'date') {
      console.log(123);
      this.sortBy = 'updatedAt';
      this.order = -1;
    } else {
      this.sortBy = event.value;
      this.order = 1;
    }
    this.getSortData.emit({ sortBy: this.sortBy, order: this.order });
  }
}
