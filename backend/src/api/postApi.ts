import * as express from 'express';
import ctrlPosts from './../controllers/postsController/index';
import authMiddleware from '../middlewares/authMiddleware';
import joiValidation from '../middlewares/joiValidationMiddleware';
import { joiSchemaPost } from '../models/post';
import allowToEdit from '../middlewares/canEditMiddleware';
import { findPost } from '../dao/postDao/getPostById';

const router = express.Router();

router.get('/', ctrlPosts.get);

router.get('/:postId', ctrlPosts.getById);

router.post(
  '/',
  authMiddleware,
  joiValidation(joiSchemaPost),
  ctrlPosts.create
);

router.patch(
  '/:postId',
  authMiddleware,
  allowToEdit(findPost),
  ctrlPosts.update
);

router.delete(
  '/:postId',
  authMiddleware,
  allowToEdit(findPost),
  ctrlPosts.remove
);

export default router;
