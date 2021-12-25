import { NextFunction, Request, Response } from 'express';
import { IPost } from '../../models/IPost';
import SuccessResponse from '../../models/SuccessResponse';
import HttpException from '../../exceptions/HttpException';
import { getAllPosts } from '../../services/postActions/getAllPosts';
import { getPostsCount } from '../../services/postActions/getPostsCount';

const get = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  //pagination part
  const { page = 0, perPage = 5 } = req.query;
  let limit: number = parseInt(perPage.toString());
  limit = limit > 10 ? 5 : limit;
  let skip: number = parseInt(page.toString()) * limit;

  //sorting part
  const { sortBy = 'updatedAt', order = -1 } = req.query;
  const sortStr: string = sortBy.toString();
  const sortOrder: number = parseInt(order.toString());
  const sortObj = { [sortStr]: sortOrder };
  try {
    const posts: IPost[] = await getAllPosts(skip, limit, sortObj);
    const totalCount = await getPostsCount();
    res.json(new SuccessResponse(200, 'Success', posts, totalCount));
  } catch (e: any) {
    next(new HttpException(400, e.message));
  }
};

export default get;
