import { NextFunction, Request, Response } from 'express';
import { Like } from '../../utils/types';
import SuccessResponse from '../../utils/SuccessResponse';
import HttpException from '../../utils/exceptions/HttpException';
import { createLike } from '../../services/likeActions';

const create = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (Object.keys(req.body).length === 0) {
    next(new HttpException(404, 'Provide values'));
    return;
  }
  const [_, userId]: any = req.headers.authorization?.split(' ');
  const like: Like = { ...req.body, userId: userId };
  try {
    const result: Like = await createLike(like);
    res.json(new SuccessResponse(201, 'Success', result));
  } catch (e: any) {
    next(new HttpException(400, e.message));
  }
};

export default create;
