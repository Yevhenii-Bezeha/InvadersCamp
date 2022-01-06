import * as express from 'express';
import ctrlLikes from '../controllers/likesController';

const router = express.Router();

router.post('/:postId/like', ctrlLikes.create);

router.patch('/:postId/like/:likeId', ctrlLikes.toggle);

export default router;
