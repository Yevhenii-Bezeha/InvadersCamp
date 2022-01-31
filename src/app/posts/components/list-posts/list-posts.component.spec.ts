import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LikesService } from '@services/likes.service';
import { AuthService } from '@services/auth.service';
import { ListPostsComponent } from './list-posts.component';
import { PostsService } from '../../services/posts.service';

describe('ListPostsComponent', () => {
  let component: ListPostsComponent;
  let fixture: ComponentFixture<ListPostsComponent>;

  const postsServiceSpy = jasmine.createSpyObj('PostsService', [
    'getPost',
    'deletePost',
  ]);
  const likesServiceSpy = jasmine.createSpyObj('LikesService', [
    'createLike',
    'toggleLike',
  ]);
  const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ListPostsComponent],
      providers: [
        { provide: PostsService, useValue: postsServiceSpy },
        { provide: LikesService, useValue: likesServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPostsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
