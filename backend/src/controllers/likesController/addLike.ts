import { NextFunction, Request, Response } from 'express';
import { Like } from '../../utils/types';
import SuccessResponse from '../../utils/SuccessResponse';
import { createLike } from '../../dao/likeDao';
import { BadRequest, Unauthorized } from 'http-errors';
import { joiSchemaLike } from '../../models/like';

const create = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.headers.authorization) {
      throw new Unauthorized('Not authorized');
    }

    const { error } = joiSchemaLike.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }

    const [_, userId]: any = req.headers.authorization.split(' ');

    const like: Like = { ...req.body, userId: userId };

    const result: Like = await createLike(like);

    res.json(new SuccessResponse(201, 'Success', result));
  } catch (error: any) {
    next(error);
  }
};

export default create;
