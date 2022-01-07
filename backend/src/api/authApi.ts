import * as express from 'express';
import ctrlAuth from './../controllers/authController';

const router = express.Router();

router.post('/signin', ctrlAuth.signin);

router.post('/signup', ctrlAuth.signup);

export default router;
