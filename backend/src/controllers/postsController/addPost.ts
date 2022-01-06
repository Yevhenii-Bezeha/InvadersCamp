import { NextFunction, Request, Response } from 'express';
import { Post } from '../../utils/types';
import SuccessResponse from '../../utils/SuccessResponse';
import { createPost } from '../../dao/postDao/createPost';
import { joiSchemaPost } from '../../models/post';
import { BadRequest, Unauthorized } from 'http-errors';

const create = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.headers.authorization) {
      throw new Unauthorized('Not authorized');
    }

    const { error } = joiSchemaPost.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }

    const [_, userId]: string[] = req.headers.authorization.split(' ');
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
