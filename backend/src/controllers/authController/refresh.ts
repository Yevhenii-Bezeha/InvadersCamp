import { NextFunction, Request, Response } from 'express';
import SuccessResponse from '../../utils/SuccessResponse';
import {
  createAccessToken,
  createRefreshToken,
  verifyToken,
} from '../../drivers/token';
import { findUserById, saveToken } from '../../dao/authDao';
import { Unauthorized } from 'http-errors';

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

    if (user.refreshToken !== refreshToken) {
      throw new Unauthorized('Not authorized');
    }

    const accessToken = createAccessToken({ _id: user._id });
    const newRefreshToken = createRefreshToken({ _id: user._id });

    await saveToken(user._id, newRefreshToken);

    res.cookie('refreshToken', newRefreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    res.json(new SuccessResponse(201, 'Success', { accessToken: accessToken }));
  } catch (error: any) {
    next(error);
  }
};

export default refresh;
