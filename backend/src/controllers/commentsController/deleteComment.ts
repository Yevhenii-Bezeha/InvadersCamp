import { NextFunction, Request, Response } from 'express';
import { Comment } from '../../utils/types';
import SuccessResponse from '../../utils/SuccessResponse';
import { removeComment } from '../../dao/commentDao';

const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { commentId } = req.params;

    const result: Comment = await removeComment(commentId);

    res.json(new SuccessResponse(200, 'Success', result));
  } catch (error: any) {
    next(error);
  }
};

export default remove;
