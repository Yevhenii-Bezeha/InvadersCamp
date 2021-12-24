import { NextFunction, Request, Response } from 'express';
import { IComment } from '../../models/IPost';
import SuccessResponse from '../../models/SuccessResponse';
import HttpException from '../../exceptions/HttpException';
import { removeComment } from '../../services/commentActions';
import NotFoundException from '../../exceptions/NotFoundException';

const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { commentId } = req.params;
  try {
    const result: IComment = await removeComment(commentId);
    result
      ? res.json(new SuccessResponse(200, 'Success', result))
      : next(new NotFoundException('Comment', commentId));
  } catch (e: any) {
    next(new HttpException(400, e.message));
  }
};

export default remove;
