import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { IPaginatorData } from '@interfaces/IPaginatorData';

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
  @Output() getPaginatorData = new EventEmitter<IPaginatorData>();

  constructor() {}

  getPageInf(event: PageEvent) {
    this.page = event.pageIndex.toString();
    this.perPage = event.pageSize.toString();
    this.getPaginatorData.emit({ page: this.page, perPage: this.perPage });
  }
}
