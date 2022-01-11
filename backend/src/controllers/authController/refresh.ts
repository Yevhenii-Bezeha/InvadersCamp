import { NextFunction, Request, Response } from 'express';
import SuccessResponse from '../../utils/SuccessResponse';
import {
  createAccessToken,
  createRefreshToken,
  verifyToken,
} from '../../drivers/token';
import { findUserById, saveToken } from '../../dao/authDao';
import { Unauthorized } from 'http-errors';
import { UserDto } from '../../dtos/userDto';
import { User } from '../../utils/types';

const refresh = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      throw new Unauthorized('Not authorized');
    }

    const userId = verifyToken(refreshToken);

    const [user] = await findUserById(userId);

    if (!user) {
      throw new Unauthorized('Not authorized');
    }
    if (user.refreshToken !== refreshToken) {
      throw new Unauthorized('Not authorized');
    }

    const accessToken = createAccessToken({ _id: user._id });
    const newRefreshToken = createRefreshToken({ _id: user._id });

    const { avatar, name, email }: User = await saveToken(
      user._id,
      newRefreshToken
    );

    const userDto: UserDto = {
      _id: user._id,
      avatar: avatar,
      name: name,
      email: email,
      accessToken: accessToken,
    };

    res.cookie('refreshToken', newRefreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    res.json(new SuccessResponse(201, 'Success', userDto));
  } catch (error: any) {
    next(error);
  }
};

export default refresh;
