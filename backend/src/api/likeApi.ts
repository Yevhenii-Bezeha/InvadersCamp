import * as express from 'express';
import ctrlLikes from '../controllers/likesController';

const router = express.Router();

router.post('/like', ctrlLikes.create);

router.post('/:postId/like', ctrlLikes.create);

router.patch('/like/:likeId', ctrlLikes.toggle);

router.patch('/:postId/like/:likeId', ctrlLikes.toggle);

export default router;
