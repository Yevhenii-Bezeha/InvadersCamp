import { NextFunction, Request, Response } from 'express';
import { Post } from '../../utils/types';
import SuccessResponse from '../../utils/SuccessResponse';
import {
  removeComments,
  removeLikes,
  removePost,
} from '../../dao/postDao/removePost';
import { NotFound, Unauthorized } from 'http-errors';

const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.headers.authorization) {
      throw new Unauthorized('Not authorized');
    }

    const { postId } = req.params;

    const result: Post = await removePost(postId);

    if (!result) {
      throw new NotFound();
    }
    await removeLikes(postId);
    await removeComments(postId);
    res.json(new SuccessResponse(200, 'Success', result));
  } catch (error: any) {
    next(error);
  }
};

export default remove;
