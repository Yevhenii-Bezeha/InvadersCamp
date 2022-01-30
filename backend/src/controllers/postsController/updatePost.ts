import { NextFunction, Request, Response } from 'express';
import { Post } from '../../utils/types';
import SuccessResponse from '../../utils/SuccessResponse';
import { updatePost } from '../../dao/postDao/updatePost';
import { BadRequest } from 'http-errors';

const update = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (Object.keys(req.body).length === 0) {
      throw new BadRequest('Provide values');
    }

    const { postId } = req.params;

    const post: Post = req.body;

    const result: Post = await updatePost(postId, post);

    res.json(new SuccessResponse(200, 'Success', result));
  } catch (error: any) {
    next(error);
  }
};

export default update;
