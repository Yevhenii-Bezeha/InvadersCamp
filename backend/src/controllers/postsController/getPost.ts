import { NextFunction, Request, Response } from 'express';
import { IGetPosts } from '../../models/IPost';
import SuccessResponse from '../../models/SuccessResponse';
import NotFoundException from '../../exceptions/NotFoundException';
import { getPostById } from '../../services/postActions/getPostById';

const getById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { postId } = req.params;
  try {
    const result: IGetPosts[] = await getPostById(postId);
    res.json(new SuccessResponse(200, 'Success', result));
  } catch (e: unknown) {
    next(new NotFoundException('Post', postId));
  }
};

export default getById;
