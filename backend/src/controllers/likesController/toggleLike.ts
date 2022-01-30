import { NextFunction, Request, Response } from 'express';
import { Like } from '../../utils/types';
import SuccessResponse from '../../utils/SuccessResponse';
import { toggleLike } from '../../dao/likeDao';
import { BadRequest } from 'http-errors';

const toggle = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (Object.keys(req.body).length === 0) {
      throw new BadRequest('Provide values');
    }

    const { likeId } = req.params;

    const { isLiked } = req.body;

    const result: Like = await toggleLike(likeId, !isLiked);

    res.json(new SuccessResponse(200, 'Success', result));
  } catch (error: any) {
    next(error);
  }
};

export default toggle;
