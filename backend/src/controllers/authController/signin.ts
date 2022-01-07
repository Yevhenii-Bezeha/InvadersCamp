import { NextFunction, Request, Response } from 'express';
import SuccessResponse from '../../utils/SuccessResponse';
import { BadRequest } from 'http-errors';
import { joiSigninSchema } from '../../models/user';
import { findUser, saveToken } from '../../dao/authDao';
import { comparePassword } from '../../drivers/password';
import { createToken } from '../../drivers/token';
import { User } from '../../utils/types';

const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { error } = joiSigninSchema.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }

    const user = await findUser(req.body.email);

    if (user.length === 0) {
      throw new BadRequest('This email does not exist');
    }

    const isPasswordCorrect = await comparePassword(
      req.body.password,
      user[0].password
    );

    if (!isPasswordCorrect) {
      throw new BadRequest('This password is not correct');
    }

    const token = createToken({ _id: user[0]._id });

    const { _id }: User = await saveToken(user[0]._id, token);

    const result = {
      _id: _id,
      token: token,
    };

    res.json(new SuccessResponse(201, 'Success', result));
  } catch (error: any) {
    next(error);
  }
};

export default signin;
