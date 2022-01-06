import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PaginatorData } from '@interfaces/PaginatorData';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent {
  public page: string;
  public perPage: string;
  @Input() totalCount: number | undefined;
  @Input() postsCountOnPage: number;
  @Output() getPaginatorData = new EventEmitter<PaginatorData>();

  constructor() {}

  getPageInf(event: PageEvent) {
    this.page = event.pageIndex.toString();
    this.perPage = event.pageSize.toString();
    this.getPaginatorData.emit({ page: this.page, perPage: this.perPage });
  }
}
