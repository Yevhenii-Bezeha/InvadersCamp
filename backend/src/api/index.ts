import * as express from 'express';
import postApi from './postApi';
import likeApi from './likeApi';
import commentApi from './commentApi';
import authApi from './authApi';
import userApi from './userApi';

const router = express.Router();

router.use('/', authApi);

router.use('/users', userApi);

router.use('/posts', postApi);

router.use('/posts/:postId/like', likeApi);

router.use('/posts/:id/comments', commentApi);

export default router;
