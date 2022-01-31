import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterComponent } from './filter.component';
import { FormBuilder } from '@angular/forms';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  const formBuilderSpy = jasmine.createSpyObj('FormBuilder', ['group']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilterComponent],
      providers: [{ provide: FormBuilder, useValue: formBuilderSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
