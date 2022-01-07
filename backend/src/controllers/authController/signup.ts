import { NextFunction, Request, Response } from 'express';
import { User } from '../../utils/types';
import SuccessResponse from '../../utils/SuccessResponse';
import { BadRequest } from 'http-errors';
import { joiSignupSchema } from '../../models/user';
import { createUser, findUser, saveToken } from '../../dao/authDao';
import { toHashPassword } from '../../drivers/password';
import { createToken } from '../../drivers/token';

const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { error } = joiSignupSchema.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }

    const user = await findUser(req.body.email);

    if (user) {
      throw new BadRequest('This email is already exists');
    }

    const hashPassword: string = await toHashPassword(req.body.password);

    const userCreated: User = await createUser({
      ...req.body,
      password: hashPassword,
    });

    const token = createToken({ _id: userCreated._id });

    const { avatar, name, email }: User = await saveToken(
      userCreated._id,
      token
    );

    const result: User = {
      avatar: avatar,
      name: name,
      email: email,
      token: token,
    };

    res.json(new SuccessResponse(201, 'Success', result));
  } catch (error: any) {
    next(error);
  }
};

export default signup;
