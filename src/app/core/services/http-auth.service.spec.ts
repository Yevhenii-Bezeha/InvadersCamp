import { fakeAsync, TestBed } from '@angular/core/testing';
import { HttpAuthService } from '@services/http-auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { mockUser } from '../testUtilities/mockUser';
import { basicUrl } from '@interfaces/basicUrl';
import { url } from '@interfaces/url';

describe('HttpAuthService', () => {
  let httpAuthService: HttpAuthService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpAuthService],
    });

    httpAuthService = TestBed.inject(HttpAuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', function () {
    expect(httpAuthService).toBeTruthy();
  });

  it('should signup', fakeAsync(() => {
    httpAuthService.signup(mockUser).subscribe((user) => {
      expect(user).toBeTruthy();
    });

    const req = httpTestingController.expectOne(`${basicUrl}/${url.signup}`);

    expect(req.request.method).toEqual('POST');

    req.flush({
      status: 201,
      message: 'ok',
      data: { mockUser },
    });
  }));

  it('should login', fakeAsync(() => {
    httpAuthService.login(mockUser).subscribe((user) => {
      expect(user).toBeTruthy();
    });

    const req = httpTestingController.expectOne(`${basicUrl}/${url.signin}`);

    expect(req.request.method).toEqual('POST');

    req.flush({
      status: 201,
      message: 'ok',
      data: { mockUser },
    });
  }));

  it('should logout', fakeAsync(() => {
    httpAuthService.logout().subscribe((user) => {
      expect(user).toBeTruthy();
    });

    const req = httpTestingController.expectOne(`${basicUrl}/${url.logout}`);

    expect(req.request.method).toEqual('GET');

    req.flush({
      status: 201,
      message: 'ok',
      data: { mockUser },
    });
  }));

  it('should refresh', fakeAsync(() => {
    httpAuthService.refresh().subscribe((user) => {
      expect(user).toBeTruthy();
    });

    const req = httpTestingController.expectOne(`${basicUrl}/${url.refresh}`);

    expect(req.request.method).toEqual('GET');

    req.flush({
      status: 201,
      message: 'ok',
      data: { mockUser },
    });
  }));

  afterEach(() => {
    httpTestingController.verify();
  });
});
