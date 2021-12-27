import { NextFunction, Request, Response } from 'express';
import { IPost } from '../../models/IPost';

import SuccessResponse from '../../models/SuccessResponse';
import HttpException from '../../exceptions/HttpException';
import NotFoundException from '../../exceptions/NotFoundException';
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
    const result: IPost = await removePost(postId);
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
