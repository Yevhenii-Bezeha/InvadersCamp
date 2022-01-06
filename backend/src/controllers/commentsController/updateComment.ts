import { NextFunction, Request, Response } from 'express';
import { IComment } from '../../models/IPost';
import SuccessResponse from '../../models/SuccessResponse';
import HttpException from '../../exceptions/HttpException';
import { updateComment } from '../../services/commentActions';
import NotFoundException from '../../exceptions/NotFoundException';

const update = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (Object.keys(req.body).length === 0) {
    next(new HttpException(404, 'Provide values'));
    return;
  }
  const { commentId } = req.params;
  const comment: IComment = req.body;
  try {
    const result: IComment = await updateComment(commentId, comment);
    result
      ? res.json(new SuccessResponse(200, 'Success', result))
      : next(new NotFoundException('Comment', commentId));
  } catch (e: any) {
    next(new HttpException(400, e.message));
  }
};

export default update;
