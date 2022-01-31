import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from '@services/localStorage.service';
import { mockToken } from '../testUtilities/mockToken';
import { mockUser } from '../testUtilities/mockUser';
import { UserDto } from '@interfaces/userDto';

describe('LocalStorageService', () => {
  let localStorageService: LocalStorageService;
  let store: any = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageService],
    });

    localStorageService = TestBed.inject(LocalStorageService);
  });

  beforeEach(() => {
    spyOn(localStorageService, 'setToken').and.callFake((token: string) => {
      store.token = token;
    });

    spyOn(localStorageService, 'getToken').and.callFake(() => {
      return store.token;
    });

    spyOn(localStorageService, 'setUser').and.callFake((userDto: UserDto) => {
      store.user = userDto;
    });

    spyOn(localStorageService, 'getUser').and.callFake(() => {
      return store.user;
    });

    spyOn(localStorageService, 'deleteItems').and.callFake(() => {
      store = {};
    });
  });

  it('should be created', function () {
    expect(localStorageService).toBeTruthy();
  });

  it('should set token to LS', function () {
    localStorageService.setToken(mockToken);

    expect(localStorageService.setToken).toHaveBeenCalled();
    expect(store.token).toBe(mockToken);
  });

  it('should get token from LS', function () {
    store.token = mockToken;

    localStorageService.getToken();

    expect(localStorageService.getToken).toHaveBeenCalled();
    expect(localStorageService.getToken()).toBe(mockToken);
  });

  it('should set user to LS', function () {
    localStorageService.setUser({ ...mockUser, accessToken: mockToken });

    expect(localStorageService.setUser).toHaveBeenCalled();
    expect(store.user).toEqual({ ...mockUser, accessToken: mockToken });
  });

  it('should get user from LS', function () {
    store.user = { ...mockUser, accessToken: mockToken };

    localStorageService.getUser();

    expect(localStorageService.getUser).toHaveBeenCalled();
    expect(localStorageService.getUser()).toEqual({
      ...mockUser,
      accessToken: mockToken,
    });
  });

  it('should delete token and user from LS', function () {
    store.user = { ...mockUser, accessToken: mockToken };
    store.token = mockToken;

    localStorageService.deleteItems();

    expect(localStorageService.deleteItems).toHaveBeenCalled();
    expect(store).toEqual({});
  });
});
