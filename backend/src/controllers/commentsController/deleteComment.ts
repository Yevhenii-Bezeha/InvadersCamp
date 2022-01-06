import { NextFunction, Request, Response } from 'express';
import { Comment } from '../../utils/types';
import SuccessResponse from '../../utils/SuccessResponse';
import HttpException from '../../utils/exceptions/HttpException';
import { removeComment } from '../../services/commentActions';
import NotFoundException from '../../utils/exceptions/NotFoundException';

const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { commentId } = req.params;
  try {
    const result: Comment = await removeComment(commentId);
    result
      ? res.json(new SuccessResponse(200, 'Success', result))
      : next(new NotFoundException('Comment', commentId));
  } catch (e: any) {
    next(new HttpException(400, e.message));
  }
};

export default remove;
