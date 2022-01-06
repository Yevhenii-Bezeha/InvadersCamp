import { NextFunction, Request, Response } from 'express';
import { Post } from '../../utils/types';
import SuccessResponse from '../../utils/SuccessResponse';
import HttpException from '../../utils/exceptions/HttpException';
import { createPost } from '../../services/postActions/createPost';

const create = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!req.body.title || !req.body.description || !req.body.tags) {
    next(new HttpException(404, 'Provide values'));
    return;
  }
  const [_, userId]: any = req.headers.authorization?.split(' ');
  const post: Post = {
    ...req.body,
    userId: userId,
  };
  try {
    const result: Post = await createPost(post);
    res.json(new SuccessResponse(201, 'Success', result));
  } catch (e: any) {
    next(new HttpException(400, e.message));
  }
};

export default create;
