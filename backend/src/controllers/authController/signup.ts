import { NextFunction, Request, Response } from 'express';
import { User } from '../../utils/types';
import SuccessResponse from '../../utils/SuccessResponse';
import { BadRequest } from 'http-errors';
import { createUser, findUserByEmail, saveToken } from '../../dao/authDao';
import { toHashPassword } from '../../drivers/password';
import { createAccessToken, createRefreshToken } from '../../drivers/token';
import { UserDto } from '../../dtos/userDto';

const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const [user] = await findUserByEmail(req.body.email);

    if (user) {
      throw new BadRequest('This email is already exists');
    }

    const hashPassword: string = await toHashPassword(req.body.password);

    const userCreated: User = await createUser({
      ...req.body,
      password: hashPassword,
    });

    const accessToken = createAccessToken({ _id: userCreated._id });
    const refreshToken = createRefreshToken({ _id: userCreated._id });

    const { avatar, name, email }: User = await saveToken(
      userCreated._id,
      refreshToken
    );

    const userDto: UserDto = {
      _id: userCreated._id,
      avatar: avatar,
      name: name,
      email: email,
      accessToken: accessToken,
    };

    res.cookie('refreshToken', refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    res.json(new SuccessResponse(201, 'Success', userDto));
  } catch (error: any) {
    next(error);
  }
};

export default signup;
