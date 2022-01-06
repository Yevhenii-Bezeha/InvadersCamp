import { NextFunction, Request, Response } from 'express';
import { Like } from '../../utils/types';
import SuccessResponse from '../../utils/SuccessResponse';
import { toggleLike } from '../../dao/likeDao';
import { BadRequest, NotFound, Unauthorized } from 'http-errors';

const toggle = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.headers.authorization) {
      throw new Unauthorized('Not authorized');
    }

    if (!req.body.isLiked) {
      throw new BadRequest('Provide values');
    }

    const { likeId } = req.params;

    const { isLiked } = req.body;

    const result: Like = await toggleLike(likeId, !isLiked);

    if (!result) {
      throw new NotFound();
    }

    res.json(new SuccessResponse(200, 'Success', result));
  } catch (error: any) {
    next(error);
  }
};

export default toggle;
