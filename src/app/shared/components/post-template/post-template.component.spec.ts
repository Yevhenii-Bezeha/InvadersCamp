import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostTemplateComponent } from './post-template.component';
import { LocalStorageService } from '@services/localStorage.service';

describe('PostTemplateComponent', () => {
  let component: PostTemplateComponent;
  let fixture: ComponentFixture<PostTemplateComponent>;

  const localStorageServiceSpy = jasmine.createSpyObj('LocalStorageService', [
    'getUser',
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostTemplateComponent],
      providers: [
        { provide: LocalStorageService, useValue: localStorageServiceSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostTemplateComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
