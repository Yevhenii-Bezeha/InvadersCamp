import { NextFunction, Request, Response } from 'express';
import { ITag } from '../../models/IPost';
import SuccessResponse from '../../models/SuccessResponse';
import HttpException from '../../exceptions/HttpException';
import { createTag } from '../../services/tagActions';

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
  const tag: ITag = { ...req.body, userId: userId };
  try {
    const result: ITag = await createTag(tag);
    res.json(new SuccessResponse(201, 'Success', result));
  } catch (e: any) {
    next(new HttpException(400, e.message));
  }
};

export default create;
