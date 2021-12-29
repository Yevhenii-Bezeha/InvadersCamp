import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { ISortData } from '@interfaces/ISortData';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss'],
})
export class SortComponent {
  @Output() getSortData = new EventEmitter<ISortData>();
  private _sortBy: string;
  private _order: number;

  constructor() {}

  onSort(event: MatButtonToggleChange): void {
    if (event.value === 'date') {
      console.log(123);
      this._sortBy = 'updatedAt';
      this._order = -1;
    } else {
      this._sortBy = event.value;
      this._order = 1;
    }
    this.getSortData.emit({ sortBy: this._sortBy, order: this._order });
  }
}
