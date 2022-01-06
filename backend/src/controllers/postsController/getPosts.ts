import { NextFunction, Request, Response } from 'express';
import { PostInf } from '../../utils/types';
import { getAllPosts } from '../../dao/postDao/getAllPosts';
import { getPostsCount } from '../../dao/postDao/getPostsCount';
import { BadRequest } from 'http-errors';
import SuccessResponse from '../../utils/SuccessResponse';

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

  //filterByTitle part
  let { filterByTitle = '' } = req.query;
  const filterByTitleStr: string = filterByTitle.toString();

  //filterByTags part
  let { filterByTags = '' } = req.query;
  const filterByTagsStr: string = filterByTags.toString();

  try {
    const posts: PostInf[] = await getAllPosts(
      skip,
      limit,
      sortObj,
      filterByTitleStr,
      filterByTagsStr
    );
    const [postsCountObj] = await getPostsCount(
      filterByTitleStr,
      filterByTagsStr
    );
    const postsCount: number = postsCountObj ? postsCountObj.count : 0;

    res.json(new SuccessResponse(200, 'Success', posts, postsCount));
  } catch (error: any) {
    next(new BadRequest(error.message));
  }
};

export default get;
