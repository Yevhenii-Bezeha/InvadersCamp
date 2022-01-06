import { NextFunction, Request, Response } from 'express';
import { Comment } from '../../utils/types';
import SuccessResponse from '../../utils/SuccessResponse';
import { createComment } from '../../dao/commentDao';
import { BadRequest, Unauthorized } from 'http-errors';
import { joiSchemaComment } from '../../models/comment';

const create = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.headers.authorization) {
      throw new Unauthorized('Not authorized');
    }

    const { error } = joiSchemaComment.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }

    const [_, userId]: any = req.headers.authorization.split(' ');

    const comment: Comment = { ...req.body, userId: userId };

    const result: Comment = await createComment(comment);

    res.json(new SuccessResponse(201, 'Success', result));
  } catch (error: any) {
    next(error);
  }
};

export default create;
