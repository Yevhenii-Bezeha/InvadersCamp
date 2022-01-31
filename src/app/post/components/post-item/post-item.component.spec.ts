import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostItemComponent } from './post-item.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PostHttpService } from '../../services/post-http.service';
import { LikesService } from '@services/likes.service';
import { FormService } from '@services/form.service';
import { LocalStorageService } from '@services/localStorage.service';
import { AuthService } from '@services/auth.service';

describe('PostItemComponent', () => {
  let component: PostItemComponent;
  let fixture: ComponentFixture<PostItemComponent>;

  const postHttpServiceSpy = jasmine.createSpyObj('PostHttpService', [
    'getPost',
    'deletePost',
  ]);
  const likesServiceSpy = jasmine.createSpyObj('LikesService', [
    'createLike',
    'toggleLike',
  ]);
  const formServiceSpy = jasmine.createSpyObj('FormService', ['openEditForm']);
  const localStorageServiceSpy = jasmine.createSpyObj('LocalStorageService', [
    'Auth$',
  ]);
  const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [PostItemComponent],
      providers: [
        { provide: PostHttpService, useValue: postHttpServiceSpy },
        { provide: LikesService, useValue: likesServiceSpy },
        { provide: FormService, useValue: formServiceSpy },
        { provide: LocalStorageService, useValue: localStorageServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostItemComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
