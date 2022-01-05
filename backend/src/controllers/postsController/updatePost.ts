import { NextFunction, Request, Response } from 'express';
import { Post } from '../../models/types';
import SuccessResponse from '../../models/SuccessResponse';
import NotFoundException from '../../exceptions/NotFoundException';
import HttpException from '../../exceptions/HttpException';
import { updatePost } from '../../services/postActions/updatePost';

const update = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (Object.keys(req.body).length === 0) {
    next(new HttpException(404, 'Provide values'));
    return;
  }
  const { postId } = req.params;
  const post: Post = req.body;
  try {
    const result: Post = await updatePost(postId, post);
    result
      ? res.json(new SuccessResponse(200, 'Success', result))
      : next(new NotFoundException('Post', postId));
  } catch (e: any) {
    next(new HttpException(400, e.message));
  }
};

export default update;
