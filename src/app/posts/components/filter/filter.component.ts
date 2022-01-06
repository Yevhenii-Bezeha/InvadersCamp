import { Component, EventEmitter, Output } from '@angular/core';
import { debounce } from 'debounce';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  public filterStr: string = '';
  @Output() getFilterData = new EventEmitter<string>();

  constructor() {
    this.onInputChange = debounce(this.onInputChange, 500);
  }

  onInputChange(): void {
    this.getFilterData.emit(this.filterStr);
  }

  onClick(): void {
    this.filterStr = '';
  }
}
