import * as express from 'express';
import ctrlAuth from './../controllers/authController';
import joiValidation from '../middlewares/joiValidationMiddleware';
import { joiSigninSchema, joiSignupSchema } from '../models/user';

const router = express.Router();

router.post('/signin', joiValidation(joiSigninSchema), ctrlAuth.signin);

router.post('/signup', joiValidation(joiSignupSchema), ctrlAuth.signup);

router.get('/refresh', ctrlAuth.refresh);

export default router;
