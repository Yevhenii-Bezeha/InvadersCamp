import * as express from 'express';
import ctrlLikes from '../controllers/likesController';
import authMiddleware from '../middlewares/authMiddleware';
import joiValidation from '../middlewares/joiValidationMiddleware';
import { joiSchemaLike } from '../models/like';
import allowToEdit from '../middlewares/canEditMiddleware';
import { findLike } from '../dao/likeDao';

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Like
 *  description: API to manage likes
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      LikeBody:
 *        type: object
 *        required:
 *          - isLiked
 *          - postId
 *        properties:
 *          isLiked:
 *            type: boolean
 *            description: has true or false
 *          postId:
 *            type: string
 *            description: post's id, related to this comment
 *        example:
 *          isLiked: true
 *          postId: 61c33a167dd44ea8dbd27b9b
 *
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      LikeResponse:
 *        type: object
 *        required:
 *          - _id
 *          - isLiked
 *          - postId
 *          - userId
 *        properties:
 *          _id:
 *            type: string
 *            description: comment's id
 *          isLiked:
 *            type: boolean
 *            description: has true or false
 *          postId:
 *            type: string
 *            description: post's id, related to this like
 *          userId:
 *            type: string
 *            description: user's id, who liked
 *        example:
 *          _id: 61c33a167dd44ea8dbd27b9b
 *          isLiked: true
 *          postId: 61c33a167dd44ea8dbd27b9b
 *          userId: 61cc310853b9b8d35b3b4d06
 *
 */

/**
 * @swagger
 *    /api/posts/:postId/like:
 *    post:
 *      summary: Create new like to the post
 *      tags: [Like]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LikeBody'
 *      responses:
 *        "201":
 *          description: created
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/LikeResponse'
 */

router.post(
  '/',
  authMiddleware,
  joiValidation(joiSchemaLike),
  ctrlLikes.create
);

/**
 * @swagger
 *    /api/posts/:postId/like/:likeId:
 *    patch:
 *      summary: Toggle like
 *      tags: [Like]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LikeBody'
 *      responses:
 *        "201":
 *          description: created
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/LikeResponse'
 */

router.patch(
  '/:likeId',
  authMiddleware,
  allowToEdit(findLike),
  ctrlLikes.toggle
);

export default router;
