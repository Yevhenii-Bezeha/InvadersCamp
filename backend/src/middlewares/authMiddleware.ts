import { NextFunction, Request, Response } from 'express';
import { Unauthorized } from 'http-errors';
import { verifyToken } from '../drivers/token';

function authMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    if (!request.headers.authorization) {
      throw new Unauthorized('Not authorized');
    }
    const [_, accessToken]: any = request.headers.authorization.split(' ');

    const userId = verifyToken(accessToken);
    request.headers.authorization = userId;
    next();
  } catch (error: any) {
    next(error);
  }
}

export default authMiddleware;
