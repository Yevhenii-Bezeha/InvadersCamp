import postApi from './postApi';
import likeApi from './likeApi';
import commentApi from './commentApi';
import * as express from 'express';

const router = express.Router();

router.use('/posts', postApi);
router.use('/posts/:postId/like', likeApi);
router.use('/posts/:id/comments', commentApi);

export default router;
