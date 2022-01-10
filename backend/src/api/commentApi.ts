import * as express from 'express';
import ctrlComments from '../controllers/commentsController';
import authMiddleware from '../middlewares/authMiddleware';
import joiValidation from '../middlewares/joiValidationMiddleware';
import { joiSchemaComment } from '../models/comment';
import { findComment } from '../dao/commentDao';
import allowToEdit from '../middlewares/canEditMiddleware';

const router = express.Router();

router.post(
  '/',
  authMiddleware,
  joiValidation(joiSchemaComment),
  ctrlComments.create
);

router.patch(
  '/:commentId',
  authMiddleware,
  allowToEdit(findComment),
  ctrlComments.update
);

router.delete(
  '/:commentId',
  authMiddleware,
  allowToEdit(findComment),
  ctrlComments.remove
);

export default router;
