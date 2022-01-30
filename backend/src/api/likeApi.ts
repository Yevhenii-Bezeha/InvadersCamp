import * as express from 'express';
import ctrlLikes from '../controllers/likesController';

const router = express.Router();

router.post('', ctrlLikes.create);

router.patch('/:likeId', ctrlLikes.toggle);

export default router;
