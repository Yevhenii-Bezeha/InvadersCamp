import * as express from 'express';
import ctrlComments from '../controllers/commentsController';

const router = express.Router();

router.post('/', ctrlComments.create);

router.patch('/:commentId', ctrlComments.update);

router.delete('/:commentId', ctrlComments.remove);

export default router;
