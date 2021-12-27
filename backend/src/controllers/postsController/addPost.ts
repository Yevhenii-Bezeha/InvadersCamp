import { NextFunction, Request, Response } from 'express';
import { IPost } from '../../models/IPost';
import SuccessResponse from '../../models/SuccessResponse';
import HttpException from '../../exceptions/HttpException';
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
  const post: IPost = {
    ...req.body,
    userId: userId,
  };
  try {
    const result: IPost = await createPost(post);
    res.json(new SuccessResponse(201, 'Success', result));
  } catch (e: any) {
    next(new HttpException(400, e.message));
  }
};

export default create;
