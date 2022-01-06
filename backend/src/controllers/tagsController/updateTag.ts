import { NextFunction, Request, Response } from 'express';
import { IComment, ITag } from '../../models/IPost';
import SuccessResponse from '../../models/SuccessResponse';
import HttpException from '../../exceptions/HttpException';
import NotFoundException from '../../exceptions/NotFoundException';
import { updateTag } from '../../services/tagActions';

const update = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (Object.keys(req.body).length === 0) {
    next(new HttpException(404, 'Provide values'));
    return;
  }
  const { tagId } = req.params;
  const tag: ITag = req.body;
  try {
    const result: IComment = await updateTag(tagId, tag);
    result
      ? res.json(new SuccessResponse(200, 'Success', result))
      : next(new NotFoundException('Tag', tagId));
  } catch (e: any) {
    next(new HttpException(400, e.message));
  }
};

export default update;
