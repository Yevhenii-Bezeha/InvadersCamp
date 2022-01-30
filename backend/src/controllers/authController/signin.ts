import { NextFunction, Request, Response } from 'express';
import SuccessResponse from '../../utils/SuccessResponse';
import { BadRequest } from 'http-errors';
import { findUserByEmail, saveToken } from '../../dao/authDao';
import { comparePassword } from '../../drivers/password';
import { createAccessToken, createRefreshToken } from '../../drivers/token';
import { User } from '../../utils/types';
import { UserDto } from '../../dtos/userDto';

const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const [user] = await findUserByEmail(req.body.email);

    if (!user) {
      throw new BadRequest('This email does not exist');
    }

    const isPasswordCorrect = await comparePassword(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect) {
      throw new BadRequest('This password is not correct');
    }

    const accessToken = createAccessToken({ _id: user._id });
    const refreshToken = createRefreshToken({ _id: user._id });

    const { avatar, name, email }: User = await saveToken(
      user._id,
      refreshToken
    );

    const userDto: UserDto = {
      _id: user._id,
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

export default signin;
