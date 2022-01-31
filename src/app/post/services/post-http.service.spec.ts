import { fakeAsync, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { basicUrl } from '@interfaces/basicUrl';
import { url } from '@interfaces/url';
import { mockPost } from '../../core/testUtilities/mockPost';
import { PostHttpService } from './post-http.service';

describe('PostHttpService', () => {
  let postHttpService: PostHttpService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostHttpService],
    });

    postHttpService = TestBed.inject(PostHttpService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', function () {
    expect(postHttpService).toBeTruthy();
  });

  it('should get post', fakeAsync(() => {
    postHttpService.getPost(mockPost._id).subscribe((post: any) => {
      expect(post).toBeTruthy();
      expect(post.mockPost.title).toBe(mockPost.title);
    });

    const req = httpTestingController.expectOne(
      `${basicUrl}/${url.posts}/${mockPost._id}`
    );

    expect(req.request.method).toEqual('GET');

    req.flush({
      status: 201,
      message: 'ok',
      data: { mockPost },
    });
  }));

  it('should create post', fakeAsync(() => {
    postHttpService.createPost(mockPost).subscribe((post: any) => {
      expect(post).toBeTruthy();
      expect(post.mockPost.title).toBe(mockPost.title);
    });

    const req = httpTestingController.expectOne(`${basicUrl}/${url.posts}`);

    expect(req.request.method).toEqual('POST');

    req.flush({
      status: 201,
      message: 'ok',
      data: { mockPost },
    });
  }));

  it('should update post', fakeAsync(() => {
    postHttpService
      .updatePost(mockPost._id, mockPost)
      .subscribe((post: any) => {
        expect(post).toBeTruthy();
        expect(post.mockPost.title).toBe(mockPost.title);
      });

    const req = httpTestingController.expectOne(
      `${basicUrl}/${url.posts}/${mockPost._id}`
    );

    expect(req.request.method).toEqual('PATCH');

    req.flush({
      status: 201,
      message: 'ok',
      data: { mockPost },
    });
  }));

  it('should delete post', fakeAsync(() => {
    postHttpService.deletePost(mockPost._id).subscribe((post: any) => {
      expect(post).toBeTruthy();
      expect(post.mockPost.title).toBe(mockPost.title);
    });

    const req = httpTestingController.expectOne(
      `${basicUrl}/${url.posts}/${mockPost._id}`
    );

    expect(req.request.method).toEqual('DELETE');

    req.flush({
      status: 201,
      message: 'ok',
      data: { mockPost },
    });
  }));

  afterEach(() => {
    httpTestingController.verify();
  });
});
