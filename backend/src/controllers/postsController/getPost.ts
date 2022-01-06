import { NextFunction, Request, Response } from 'express';
import { PostInf } from '../../utils/types';
import SuccessResponse from '../../utils/SuccessResponse';
import NotFoundException from '../../utils/exceptions/NotFoundException';
import { getPostById } from '../../services/postActions/getPostById';
import { getComments } from '../../services/commentActions';

const getById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { postId } = req.params;
  try {
    const result: PostInf[] = await getPostById(postId);
    result[0].comments = await getComments(postId);
    res.json(new SuccessResponse(200, 'Success', result));
  } catch (e: unknown) {
    next(new NotFoundException('Post', postId));
  }
};

export default getById;
