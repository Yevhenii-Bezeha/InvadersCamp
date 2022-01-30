import { NextFunction, Request, Response } from 'express';
import { Comment } from '../../utils/types';
import SuccessResponse from '../../utils/SuccessResponse';
import { updateComment } from '../../dao/commentDao';
import { BadRequest, NotFound, Unauthorized } from 'http-errors';

const update = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.headers.authorization) {
      throw new Unauthorized('Not authorized');
    }

    if (Object.keys(req.body).length === 0) {
      throw new BadRequest('Provide values');
    }

    const { commentId } = req.params;

    const comment: Comment = req.body;

    const result: Comment = await updateComment(commentId, comment);

    if (!result) {
      throw new NotFound();
    }

    res.json(new SuccessResponse(200, 'Success', result));
  } catch (error: any) {
    next(error);
  }
};

export default update;
