import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommentComponent } from './comment.component';
import { LocalStorageService } from '@services/localStorage.service';

describe('CommentComponent', () => {
  let component: CommentComponent;
  let fixture: ComponentFixture<CommentComponent>;

  const localStorageServiceSpy = jasmine.createSpyObj('LocalStorageService', [
    'getUser',
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommentComponent],
      providers: [
        { provide: LocalStorageService, useValue: localStorageServiceSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
