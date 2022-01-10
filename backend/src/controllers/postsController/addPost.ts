import { NextFunction, Request, Response } from 'express';
import { createPost } from '../../dao/postDao/createPost';
import SuccessResponse from '../../utils/SuccessResponse';
import { Post } from '../../utils/types';

const create = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.headers.authorization;

    const post: Post = {
      ...req.body,
      userId: userId,
    };

    const result: Post = await createPost(post);

    res.json(new SuccessResponse(201, 'Success', result));
  } catch (error: any) {
    next(error);
  }
};

export default create;
