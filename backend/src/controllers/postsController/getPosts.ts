import { NextFunction, Request, Response } from 'express';
import { IPost } from '../../models/IPost';
import SuccessResponse from '../../models/SuccessResponse';
import HttpException from '../../exceptions/HttpException';
import { getAllPosts } from '../../services/postActions/getAllPosts';

const get = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  //pagination part
  const { page = 1, perPage = 5 } = req.query;
  let limit: number = parseInt(perPage.toString());
  limit = limit > 10 ? 5 : limit;
  let skip: number = parseInt(page.toString()) * limit - 5;
  skip = skip < 1 ? 0 : skip;

  //sorting part
  const { sortBy = 'updatedAt', order = -1 } = req.query;
  const sortStr: string = sortBy.toString();
  const sortOrder: number = parseInt(order.toString());
  const sortObj = { [sortStr]: sortOrder };
  try {
    const results: IPost[] = await getAllPosts(skip, limit, sortObj);
    res.json(new SuccessResponse(200, 'Success', results));
  } catch (e: any) {
    next(new HttpException(400, e.message));
  }
};

export default get;
