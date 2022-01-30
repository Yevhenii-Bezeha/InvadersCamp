import { fakeAsync, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { LikesService } from '@services/likes.service';
import { LocalStorageService } from '@services/localStorage.service';
import { mockLike } from '../testUtilities/mockLikes';
import { Like } from '@interfaces/postRelatedTypes';
import { mockUser } from '../testUtilities/mockUser';
import { basicUrl } from '@interfaces/basicUrl';
import { url } from '@interfaces/url';
import { mockPost } from '../testUtilities/mockPost';

describe('LikesService', () => {
  let likesService: LikesService;
  let httpTestingController: HttpTestingController;
  let localStorageService: any;

  beforeEach(() => {
    const localStorageServiceSpy = jasmine.createSpyObj('LocalStorageService', [
      'getUser',
    ]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        LikesService,
        { provide: LocalStorageService, useValue: localStorageServiceSpy },
      ],
    });

    likesService = TestBed.inject(LikesService);
    httpTestingController = TestBed.inject(HttpTestingController);
    localStorageService = TestBed.inject(LocalStorageService);
  });

  it('should be created', function () {
    expect(likesService).toBeTruthy();
  });

  it("should return is this User's like", function () {
    const likesArr: Like[] = [mockLike];
    localStorageService.getUser.and.returnValue(mockUser);
    const result = likesService.isUserLiked(likesArr);
    expect(result).toBeTruthy();
  });

  it('should create like', fakeAsync(() => {
    likesService.createLike(mockLike, mockPost._id).subscribe((data) => {
      expect(data).toBeTruthy();
    });

    const req = httpTestingController.expectOne(
      `${basicUrl}/${url.posts}/${mockPost._id}/${url.like}`
    );

    expect(req.request.method).toEqual('POST');

    req.flush({
      status: 201,
      message: 'ok',
      data: { mockLike },
    });
  }));

  it("should toogle like's status", fakeAsync(() => {
    likesService
      .toggleLike(mockLike._id, mockLike.isLiked, mockPost._id)
      .subscribe((data) => {
        expect(data).toBeTruthy();
      });

    const req = httpTestingController.expectOne(
      `${basicUrl}/${url.posts}/${mockPost._id}/${url.like}/${mockLike._id}`
    );

    expect(req.request.method).toEqual('PATCH');

    req.flush({
      status: 201,
      message: 'ok',
      data: { mockLike },
    });
  }));

  afterEach(() => {
    httpTestingController.verify();
  });
});
