import { fakeAsync, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { basicUrl } from '@interfaces/basicUrl';
import { url } from '@interfaces/url';
import { CommentsService } from './comments.service';
import { mockComment } from '../../core/testUtilities/mockComment';
import { mockPost } from '../../core/testUtilities/mockPost';

describe('CommentsService', () => {
  let commentsService: CommentsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CommentsService],
    });

    commentsService = TestBed.inject(CommentsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', function () {
    expect(commentsService).toBeTruthy();
  });

  it('should create comment', fakeAsync(() => {
    commentsService
      .createComment(mockComment, mockPost._id)
      .subscribe((comment: any) => {
        expect(comment).toBeTruthy();
        expect(comment.mockComment.message).toBe(mockComment.message);
      });

    const req = httpTestingController.expectOne(
      `${basicUrl}/${url.posts}/${mockPost._id}/${url.comments}`
    );

    expect(req.request.method).toEqual('POST');

    req.flush({
      status: 201,
      message: 'ok',
      data: { mockComment },
    });
  }));

  it('should update comment', fakeAsync(() => {
    commentsService
      .updateComment(mockComment, mockPost._id)
      .subscribe((comment: any) => {
        expect(comment).toBeTruthy();
        expect(comment.mockComment.message).toBe(mockComment.message);
      });

    const req = httpTestingController.expectOne(
      `${basicUrl}/${url.posts}/${mockPost._id}/${url.comments}/${mockComment._id}`
    );

    expect(req.request.method).toEqual('PATCH');

    req.flush({
      status: 201,
      message: 'ok',
      data: { mockComment },
    });
  }));

  it('should delete comment', fakeAsync(() => {
    commentsService
      .deleteComment(mockComment._id, mockPost._id)
      .subscribe((comment: any) => {
        expect(comment).toBeTruthy();
        expect(comment.mockComment.message).toBe(mockComment.message);
      });

    const req = httpTestingController.expectOne(
      `${basicUrl}/${url.posts}/${mockPost._id}/${url.comments}/${mockComment._id}`
    );

    expect(req.request.method).toEqual('DELETE');

    req.flush({
      status: 201,
      message: 'ok',
      data: { mockComment },
    });
  }));

  afterEach(() => {
    httpTestingController.verify();
  });
});
