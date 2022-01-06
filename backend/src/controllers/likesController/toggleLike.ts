import { NextFunction, Request, Response } from 'express';
import { ILike } from '../../models/IPost';
import SuccessResponse from '../../models/SuccessResponse';
import HttpException from '../../exceptions/HttpException';
import NotFoundException from '../../exceptions/NotFoundException';
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
    const result: ILike = await toggleLike(likeId, !isLiked);
    result
      ? res.json(new SuccessResponse(200, 'Success', result))
      : next(new NotFoundException('Like', likeId));
  } catch (e: any) {
    next(new HttpException(400, e.message));
  }
};

export default toggle;
