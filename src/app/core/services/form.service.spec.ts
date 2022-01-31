import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormService } from '@services/form.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { routesPost } from '../../post/post.routing.module';
import { mockPost } from '../testUtilities/mockPost';

describe('FormService', () => {
  let formService: FormService;
  let router: Router;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routesPost)],
      providers: [FormService],
    });

    formService = TestBed.inject(FormService);
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it('should be created', function () {
    expect(formService).toBeTruthy();
  });

  it('should change url to /add', fakeAsync(() => {
    formService.openAddForm();
    tick();
    expect(location.path()).toBe('/add');
  }));

  it('should change url to /edit', fakeAsync(() => {
    formService.openEditForm(mockPost);
    tick();
    expect(location.path()).toBe('/edit');
  }));
});
