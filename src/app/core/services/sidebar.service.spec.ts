import { TestBed } from '@angular/core/testing';
import { SidebarService } from '@services/sidebar.service';

describe('SidebarService', () => {
  let sidebarService: SidebarService;
  let isSidenavOpened: boolean;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SidebarService],
    });

    sidebarService = TestBed.inject(SidebarService);
  });

  beforeEach(() => {
    spyOn(sidebarService, 'closeSidenav').and.callFake(() => {
      isSidenavOpened = false;
    });

    spyOn(sidebarService, 'toggleSidenav').and.callFake(() => {
      isSidenavOpened = !isSidenavOpened;
    });
  });

  it('should be created', function () {
    expect(sidebarService).toBeTruthy();
  });

  it('should close sidebar', function () {
    sidebarService.closeSidenav();

    expect(sidebarService.closeSidenav).toHaveBeenCalled();
    expect(isSidenavOpened).toBeFalsy();
  });

  it('should toggle sidebar', function () {
    isSidenavOpened = false;
    sidebarService.toggleSidenav();

    expect(sidebarService.toggleSidenav).toHaveBeenCalled();
    expect(isSidenavOpened).toBeTruthy();
  });
});
