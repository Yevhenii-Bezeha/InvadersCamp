import { NextFunction, Request, Response } from 'express';
import { Post } from '../../utils/types';

import SuccessResponse from '../../utils/SuccessResponse';
import HttpException from '../../utils/exceptions/HttpException';
import NotFoundException from '../../utils/exceptions/NotFoundException';
import {
  removeComments,
  removeLikes,
  removePost,
} from '../../services/postActions/removePost';

const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { postId } = req.params;
  const [_, userId]: any = req.headers.authorization?.split(' ');
  try {
    const result: Post = await removePost(postId);
    if (!result) {
      next(new NotFoundException('Post', postId));
      return;
    }
    await removeLikes(postId);
    await removeComments(postId);
    res.json(new SuccessResponse(200, 'Success', result));
  } catch (e: any) {
    next(new HttpException(400, e.message));
  }
};

export default remove;
