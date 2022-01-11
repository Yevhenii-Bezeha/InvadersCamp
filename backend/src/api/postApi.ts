import * as express from 'express';
import ctrlPosts from './../controllers/postsController/index';
import authMiddleware from '../middlewares/authMiddleware';
import joiValidation from '../middlewares/joiValidationMiddleware';
import { joiSchemaPost } from '../models/post';
import allowToEdit from '../middlewares/canEditMiddleware';
import { findPost } from '../dao/postDao/getPostById';

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Post
 *  description: API to manage posts
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      PostsWithAddInf:
 *        type: object
 *        required:
 *          - _id
 *          - title
 *          - description
 *          - tags
 *          - userId
 *          - user
 *          - comments
 *          - likes
 *        properties:
 *          _id:
 *            type: string
 *            description: post id
 *          title:
 *            type: string
 *            description: post title
 *          description:
 *            type: string
 *            description: post description
 *          tags:
 *            type: array
 *            description: array of post's tags
 *          userId:
 *            type: string
 *            description: id of user, who created post
 *          user:
 *            type: array
 *            description: user properties, who created post
 *          comments:
 *            type: array
 *            description: post's comments
 *          likes:
 *            type: array
 *            description: post's likes
 *        example:
 *          _id: 61dc471bc8080bc723317016
 *          title: easy
 *          description: Too easy
 *          tags: [Psychology, News]
 *          userId: 61cc30c553b9b8d35b3b4cfe
 *          user: user object
 *          comments: comments arr
 *          likes: likes arr
 *
 */

/**
 * @swagger
 *    /api/posts:
 *    get:
 *      summary: Get all posts
 *      tags: [Post]
 *      responses:
 *        "201":
 *          description:  Success.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/PostsWithAddInf'
 *
 */

router.get('/', ctrlPosts.get);

/**
 * @swagger
 *    /api/posts/:id:
 *    get:
 *      summary: Get post by id
 *      tags: [Post]
 *      responses:
 *        "201":
 *          description:  Success.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/PostsWithAddInf'
 *
 *
 */

router.get('/:postId', ctrlPosts.getById);

/**
 * @swagger
 *  components:
 *    schemas:
 *      TaskCreation:
 *        type: object
 *        required:
 *          - title
 *          - description
 *          - tags
 *          - userId
 *        properties:
 *          title:
 *            type: string
 *            description: post title
 *          description:
 *            type: string
 *            description: post description
 *          tags:
 *            type: array
 *            description: array of post's tags
 *          userId:
 *            type: string
 *            description: id of user, who created post
 *        example:
 *          title: easy
 *          description: Too easy
 *          tags: [Psychology, News]
 *          userId: 61cc30c553b9b8d35b3b4cfe
 *
 */

/**
 * @swagger
 *    /api/posts:
 *    post:
 *      summary: Create post
 *      tags: [Post]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TaskCreation'
 *      responses:
 *        "201":
 *          description:  Success.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/TaskCreation'
 *
 *
 */

router.post(
  '/',
  authMiddleware,
  joiValidation(joiSchemaPost),
  ctrlPosts.create
);

/**
 * @swagger
 *    /api/posts/:id:
 *    patch:
 *      summary: Update post
 *      tags: [Post]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/TaskCreation'
 *      responses:
 *        "201":
 *          description:  Success.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/TaskCreation'
 *
 */

router.patch(
  '/:postId',
  authMiddleware,
  allowToEdit(findPost),
  ctrlPosts.update
);

/**
 * @swagger
 *    /api/posts:
 *    delete:
 *      summary: Delete post
 *      tags: [Post]
 *      responses:
 *        "201":
 *          description:  Success.
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/TaskCreation'
 *
 *
 */

router.delete(
  '/:postId',
  authMiddleware,
  allowToEdit(findPost),
  ctrlPosts.remove
);

export default router;
