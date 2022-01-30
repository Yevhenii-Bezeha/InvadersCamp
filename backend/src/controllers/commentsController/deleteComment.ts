import { NextFunction, Request, Response } from 'express';
import { Comment } from '../../utils/types';
import SuccessResponse from '../../utils/SuccessResponse';
import { removeComment } from '../../dao/commentDao';
import { NotFound, Unauthorized } from 'http-errors';

const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.headers.authorization) {
      throw new Unauthorized('Not authorized');
    }

    const { commentId } = req.params;

    const result: Comment = await removeComment(commentId);

    if (!result) {
      throw new NotFound();
    }

    res.json(new SuccessResponse(200, 'Success', result));
  } catch (error: any) {
    next(error);
  }
};

export default remove;
