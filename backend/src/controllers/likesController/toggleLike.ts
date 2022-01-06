import { NextFunction, Request, Response } from 'express';
import { Like } from '../../utils/types';
import SuccessResponse from '../../utils/SuccessResponse';
import HttpException from '../../utils/exceptions/HttpException';
import NotFoundException from '../../utils/exceptions/NotFoundException';
import { toggleLike } from '../../services/likeActions';

const toggle = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (Object.keys(req.body).length === 0) {
    next(new HttpException(404, 'Provide values'));
    return;
  }
  const { likeId } = req.params;
  const { isLiked } = req.body;
  try {
    const result: Like = await toggleLike(likeId, !isLiked);
    result
      ? res.json(new SuccessResponse(200, 'Success', result))
      : next(new NotFoundException('Like', likeId));
  } catch (e: any) {
    next(new HttpException(400, e.message));
  }
};

export default toggle;
