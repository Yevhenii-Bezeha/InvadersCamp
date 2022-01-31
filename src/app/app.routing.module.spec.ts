import { Location } from '@angular/common';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { appRoutes } from './app.routing.module';

describe('Router: App', () => {
  let location: Location;
  let router: Router;

  // Configure router testing module
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(appRoutes)],
      declarations: [],
      providers: [Location],
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  // Test for asyncFake
  it('fakeAsync works', fakeAsync(() => {
    const promise = new Promise((resolve) => {
      setTimeout(resolve, 10);
    });
    let done = false;
    promise.then(() => (done = true));
    tick(50);
    expect(done).toBeTruthy();
  }));

  it('navigate to "" redirects you to /posts', fakeAsync(() => {
    router.navigateByUrl('');
    tick();
    expect(location.path()).toBe('/posts');
  }));
});
