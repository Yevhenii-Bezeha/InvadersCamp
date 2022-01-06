import { NextFunction, Request, Response } from 'express';
import { PostInf } from '../../utils/types';
import SuccessResponse from '../../utils/SuccessResponse';
import { getPostById } from '../../dao/postDao/getPostById';
import { getComments } from '../../dao/commentDao';
import { NotFound } from 'http-errors';

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
    next(new NotFound());
  }
};

export default getById;
