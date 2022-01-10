import * as express from 'express';
import ctrlLikes from '../controllers/likesController';
import authMiddleware from '../middlewares/authMiddleware';
import joiValidation from '../middlewares/joiValidationMiddleware';
import { joiSchemaLike } from '../models/like';
import allowToEdit from '../middlewares/canEditMiddleware';
import { findLike } from '../dao/likeDao';

const router = express.Router();

router.post(
  '/',
  authMiddleware,
  joiValidation(joiSchemaLike),
  ctrlLikes.create
);

router.patch(
  '/:likeId',
  authMiddleware,
  allowToEdit(findLike),
  ctrlLikes.toggle
);

export default router;
