import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostComponent } from './post.component';
import { Location } from '@angular/common';

describe('ErrorPageComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  const locationSpy = jasmine.createSpyObj('AuthService', ['back']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PostComponent],
      providers: [{ provide: Location, useValue: locationSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go back on click', function () {
    component.onClickBack();

    expect(locationSpy.back).toHaveBeenCalled();
  });
});
