import { NextFunction, Request, Response } from 'express';
import {
  createPost,
  getAllPosts,
  getPostById,
  removePost,
  updatePost,
} from '../services/postActions';
import { IPost } from '../models/IPost';
import PostNotFoundException from '../exceptions/PostNotFoundException';
import HttpException from '../exceptions/HttpException';
import SuccessResponse from '../models/SuccessResponse';

const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const results: IPost[] = await getAllPosts();
    res.json(new SuccessResponse(200, 'Success', results));
  } catch (e: any) {
    next(e);
  }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const result: IPost = await getPostById(id);
    res.json(new SuccessResponse(200, 'Success', result));
  } catch (e: unknown) {
    next(new PostNotFoundException(id));
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  const post: IPost = req.body;
  try {
    const result: IPost = await createPost(post);
    res.json(new SuccessResponse(201, 'Success', result));
  } catch (e: any) {
    next(new HttpException(400, e.message));
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  const { postId } = req.params;
  const post: IPost = req.body;
  try {
    const result: IPost = await updatePost(postId, post);
    res.json(new SuccessResponse(200, 'Success', result));
  } catch (e: any) {
    next(new HttpException(400, e.message));
  }
};

const remove = async (req: Request, res: Response, next: NextFunction) => {
  const { postId } = req.params;
  try {
    const result: IPost = await removePost(postId);
    res.json(new SuccessResponse(200, 'Success', result));
  } catch (e: any) {
    next(new HttpException(400, e.message));
  }
};

const ctrlPosts = { get, create, getById, update, remove };

export default ctrlPosts;
