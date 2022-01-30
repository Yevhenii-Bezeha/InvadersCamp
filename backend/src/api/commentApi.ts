import * as express from 'express';
import ctrlComments from '../controllers/commentsController';
import authMiddleware from '../middlewares/authMiddleware';
import joiValidation from '../middlewares/joiValidationMiddleware';
import { joiSchemaComment } from '../models/comment';
import { findComment } from '../dao/commentDao';
import allowToEdit from '../middlewares/canEditMiddleware';

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Comment
 *  description: API to manage comments
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      CommentBody:
 *        type: object
 *        required:
 *          - message
 *          - postId
 *        properties:
 *          message:
 *            type: string
 *            description: text of the comment
 *          postId:
 *            type: string
 *            description: post's id, related to this comment
 *        example:
 *          message: Hello!
 *          postId: 61c33a167dd44ea8dbd27b9b
 *
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      CommentResponse:
 *        type: object
 *        required:
 *          - _id
 *          - message
 *          - postId
 *          - userId
 *        properties:
 *          _id:
 *            type: string
 *            description: comment's id
 *          message:
 *            type: string
 *            description: text of the comment
 *          postId:
 *            type: string
 *            description: post's id, related to this comment
 *          userId:
 *            type: string
 *            description: user's id, who commented
 *        example:
 *          _id: 61c33a167dd44ea8dbd27b9b
 *          message: Hello!
 *          postId: 61c33a167dd44ea8dbd27b9b
 *          userId: 61cc310853b9b8d35b3b4d06
 *
 */

/**
 * @swagger
 *    /api/posts/:postId/comments:
 *    post:
 *      summary: Create new comment to the post
 *      tags: [Comment]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CommentBody'
 *      responses:
 *        "201":
 *          description: created
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/CommentResponse'
 */

router.post(
  '/',
  authMiddleware,
  joiValidation(joiSchemaComment),
  ctrlComments.create
);

/**
 * @swagger
 *    /api/posts/:postId/comments/:commentId:
 *    patch:
 *      summary: Update comment
 *      tags: [Comment]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CommentBody'
 *      responses:
 *        "201":
 *          description: created
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/CommentResponse'
 */

router.patch(
  '/:commentId',
  authMiddleware,
  allowToEdit(findComment),
  ctrlComments.update
);

/**
 * @swagger
 *    /api/posts/:postId/comments/:commentId:
 *    delete:
 *      summary: Delete comment
 *      tags: [Comment]
 *      responses:
 *        "201":
 *          description: created
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/CommentResponse'
 */

router.delete(
  '/:commentId',
  authMiddleware,
  allowToEdit(findComment),
  ctrlComments.remove
);

export default router;
