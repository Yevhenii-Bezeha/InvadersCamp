import * as express from 'express';
import ctrlAuth from './../controllers/authController';
import joiValidation from '../middlewares/joiValidationMiddleware';
import { joiSigninSchema, joiSignupSchema } from '../models/user';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: API to manage auth
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      UserRegistrationBody:
 *        type: object
 *        required:
 *          - name
 *          - email
 *          - password
 *        properties:
 *          name:
 *            type: string
 *            description: user name
 *          email:
 *            type: string
 *            description: user email
 *          password:
 *            type: string
 *            description: user password
 *        example:
 *          name: username
 *          email: email@email.com
 *          password: password
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      UserRegistrationResponse:
 *        type: object
 *        required:
 *          - _id
 *          - name
 *          - email
 *          - password
 *          - accessToken
 *          - refreshToken
 *        properties:
 *          _id:
 *            type: string
 *            description: user id
 *          name:
 *            type: string
 *            description: user name
 *          email:
 *            type: string
 *            description: user email
 *          password:
 *            type: string
 *            description: user password
 *          accessToken:
 *            type: string
 *            description: user access token
 *          refreshToken:
 *            type: string
 *            description: user refresh token
 *        example:
 *          _id: 61dc471bc8080bc723317016
 *          name: username
 *          email: email@email.com
 *          password: password
 *          accessToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWRjNDcxYmM4MDgwYmM3MjMzMTcwMTYiLCJpYXQiOjE2NDE4MzIzOTEsImV4cCI6MTY0NDQyNDM5MX0.P6eTA0U-YZIvhN9vvXVKB5k1NVIEnDBGw-GsRp8ckyU
 *          refreshToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWRjNDcxYmM4MDgwYmM3MjMzMTcwMTYiLCJpYXQiOjE2NDE4MzIzOTEsImV4cCI6MTY0NDQyNDM5MX0.P6eTA0U-YZIvhN9vvXVKB5k1NVIEnDBGw-GsRp8ckyU
 *
 *
 */

/**
 * @swagger
 *    /api/signup:
 *    post:
 *      summary: User registration
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserRegistrationBody'
 *      responses:
 *        "201":
 *          description: created
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/UserRegistrationResponse'
 */

router.post('/signup', joiValidation(joiSignupSchema), ctrlAuth.signup);

/**
 * @swagger
 *  components:
 *    schemas:
 *      UserLoginBody:
 *        type: object
 *        required:
 *          - email
 *          - password
 *        properties:
 *          email:
 *            type: string
 *            description: user email
 *          password:
 *            type: string
 *            description: user password
 *        example:
 *          email: email@email.com
 *          password: password
 *
 *
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      UserLoginResponse:
 *        type: object
 *        required:
 *          - _id
 *          - email
 *          - password
 *          - accessToken
 *          - refreshToken
 *        properties:
 *          _id:
 *            type: string
 *            description: user id
 *          email:
 *            type: string
 *            description: user email
 *          password:
 *            type: string
 *            description: user password
 *          accessToken:
 *            type: string
 *            description: user access token
 *          refreshToken:
 *            type: string
 *            description: user refresh token
 *        example:
 *          _id: 61dc471bc8080bc723317016
 *          email: email@email.com
 *          password: password
 *          accessToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWRjNDcxYmM4MDgwYmM3MjMzMTcwMTYiLCJpYXQiOjE2NDE4MzIzOTEsImV4cCI6MTY0NDQyNDM5MX0.P6eTA0U-YZIvhN9vvXVKB5k1NVIEnDBGw-GsRp8ckyU
 *          refreshToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWRjNDcxYmM4MDgwYmM3MjMzMTcwMTYiLCJpYXQiOjE2NDE4MzIzOTEsImV4cCI6MTY0NDQyNDM5MX0.P6eTA0U-YZIvhN9vvXVKB5k1NVIEnDBGw-GsRp8ckyU
 *
 *
 */

/**
 * @swagger
 *    /api/login:
 *    post:
 *      summary: User login
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserLoginBody'
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/UserLoginResponse'
 */

router.post('/signin', joiValidation(joiSigninSchema), ctrlAuth.signin);

/**
 * @swagger
 *  components:
 *    schemas:
 *      Refresh:
 *        type: object
 *        required:
 *          - _id
 *          - accessToken
 *        properties:
 *          _id:
 *            type: string
 *            description: user id
 *          accessToken:
 *            type: string
 *            description: new access token
 *        example:
 *          _id: 61dc471bc8080bc723317016
 *          accessToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWRjNDcxYmM4MDgwYmM3MjMzMTcwMTYiLCJpYXQiOjE2NDE4MzIzOTEsImV4cCI6MTY0NDQyNDM5MX0.P6eTA0U-YZIvhN9vvXVKB5k1NVIEnDBGw-GsRp8ckyU
 */

/**
 * @swagger
 *    /api/refresh:
 *    get:
 *      summary: Refresh token
 *      tags: [Auth]
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Refresh'
 */

router.get('/refresh', ctrlAuth.refresh);

/**
 * @swagger
 *    /api/logout:
 *    get:
 *      summary: Logout
 *      tags: [Auth]
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json
 *
 */

router.get('/logout', authMiddleware, ctrlAuth.logout);

export default router;
