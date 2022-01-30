import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { debounce } from 'debounce';
import { tagsEnum } from '@interfaces/tagsEnum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '../../../shared/classes/BaseComponent';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  public filterByTitleStr: string = '';
  public filterByTitleTag: string = '';
  public tagCategories: string[] = Object.keys(tagsEnum);
  public tagForm: FormGroup;
  @Output() getFilterByTitleData = new EventEmitter<string>();
  @Output() getFilterByTagData = new EventEmitter<string>();

  constructor(private fb: FormBuilder) {
    super();
    this.onInputTitleChange = debounce(this.onInputTitleChange, 500);
  }

  ngOnInit(): void {
    this.getFormDone();
    this.onInputTagChange();
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  getFormDone() {
    this.tagForm = this.fb.group({
      tags: ['', Validators.required],
    });
  }

  onInputTitleChange(): void {
    this.getFilterByTitleData.emit(this.filterByTitleStr);
  }

  onInputTagChange(): void {
    super.addObserver(
      this.tagForm.valueChanges.subscribe((arrTags) => {
        const tagStr = arrTags.tags.join();
        this.getFilterByTagData.emit(tagStr);
      })
    );
  }

  onClick(): void {
    this.filterByTitleStr = '';
  }
}
