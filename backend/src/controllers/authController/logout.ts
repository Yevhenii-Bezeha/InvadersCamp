import { NextFunction, Request, Response } from 'express';
import SuccessResponse from '../../utils/SuccessResponse';
import { saveToken } from '../../dao/authDao';

const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.headers.authorization;

    await saveToken(userId, '');

    res.json(new SuccessResponse(201, 'Success', { userId: userId }));
  } catch (error: any) {
    next(error);
  }
};

export default logout;
