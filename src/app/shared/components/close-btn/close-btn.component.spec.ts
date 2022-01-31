import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CloseBtnComponent } from './close-btn.component';

describe('CloseBtnComponent', () => {
  let component: CloseBtnComponent;
  let fixture: ComponentFixture<CloseBtnComponent>;

  const locationSpy = jasmine.createSpyObj('FormBuilder', ['back']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CloseBtnComponent],
      providers: [{ provide: location, useValue: locationSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseBtnComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
