import * as express from 'express';
import { Request, Response } from 'express';
import { posts } from '../models/posts';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.json(posts);
});

export default router;
