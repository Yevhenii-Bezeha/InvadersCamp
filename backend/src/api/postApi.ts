import * as express from 'express';
import ctrlPosts from '../controllers/postsController';

const router = express.Router();

router.get('/', ctrlPosts.get);

router.get('/:id', ctrlPosts.getById);

router.post('/', ctrlPosts.create);

router.patch('/:postId', ctrlPosts.update);

router.delete('/:postId', ctrlPosts.remove);

export default router;
