import * as express from 'express';
import ctrlTags from '../controllers/tagsController';

const router = express.Router();

router.post('/', ctrlTags.create);

router.patch('/:tagId', ctrlTags.update);

router.delete('/:tagId', ctrlTags.remove);

export default router;
