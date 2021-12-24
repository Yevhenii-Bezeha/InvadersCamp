import { NextFunction, Request, Response } from 'express';
import { ITag } from '../../models/IPost';
import SuccessResponse from '../../models/SuccessResponse';
import HttpException from '../../exceptions/HttpException';
import NotFoundException from '../../exceptions/NotFoundException';
import { removeTag } from '../../services/tagActions';

const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { tagId } = req.params;
  try {
    const result: ITag = await removeTag(tagId);
    result
      ? res.json(new SuccessResponse(200, 'Success', result))
      : next(new NotFoundException('Tag', tagId));
  } catch (e: any) {
    next(new HttpException(400, e.message));
  }
};

export default remove;
