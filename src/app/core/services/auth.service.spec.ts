import { TestBed } from '@angular/core/testing';
import { AuthService } from '@services/auth.service';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
    });

    authService = TestBed.inject(AuthService);
  });

  it('should be created', function () {
    expect(authService).toBeTruthy();
  });

  it('should change auth to true', function () {
    authService.addAuth();

    authService.Auth$.subscribe((value) => {
      expect(value).toBeTruthy();
    });
  });

  it('should change auth to false', function () {
    authService.addAuth();
    authService.removeAuth();

    authService.Auth$.subscribe((value) => {
      expect(value).toBeFalsy();
    });
  });
});
