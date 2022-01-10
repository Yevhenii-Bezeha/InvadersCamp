import { NextFunction, Request, Response } from 'express';
import { Comment } from '../../utils/types';
import { BadRequest } from 'http-errors';
import { updateComment } from '../../dao/commentDao';
import SuccessResponse from '../../utils/SuccessResponse';

const update = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (Object.keys(req.body).length === 0) {
      throw new BadRequest('Provide values');
    }

    const { commentId } = req.params;

    const commentToUpd: Comment = req.body;

    const result: Comment = await updateComment(commentId, commentToUpd);

    res.json(new SuccessResponse(200, 'Success', result));
  } catch (error: any) {
    next(error);
  }
};

export default update;
