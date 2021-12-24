import * as express from 'express';
import ctrlPosts from './../controllers/postsController/index';

const router = express.Router();

router.get('/', ctrlPosts.get);

router.get('/:postId', ctrlPosts.getById);

router.post('/', ctrlPosts.create);

router.patch('/:postId', ctrlPosts.update);

router.delete('/:postId', ctrlPosts.remove);

export default router;
