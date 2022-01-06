import { NextFunction, Request, Response } from 'express';
import { PostInf } from '../../utils/types';
import SuccessResponse from '../../utils/SuccessResponse';
import { getAllPosts } from '../../dao/postDao/getAllPosts';
import { getPostsCount } from '../../dao/postDao/getPostsCount';
import { BadRequest } from 'http-errors';

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

  //filter part
  let { filter } = req.query;
  if (filter) {
    filter = { title: filter };
  } else {
    filter = {};
  }
  try {
    const posts: PostInf[] = await getAllPosts(skip, limit, sortObj, filter);
    const totalCount = await getPostsCount(filter);
    res.json(new SuccessResponse(200, 'Success', posts, totalCount));
  } catch (error: any) {
    next(new BadRequest(error.message));
  }
};

export default get;
