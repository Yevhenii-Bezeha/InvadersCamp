import { Forbidden, NotFound } from 'http-errors';
import { NextFunction, Request, Response } from 'express';

function allowToEdit(findItemFunc: any) {
  return async function (
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const userId = request.headers.authorization;

      const params = request.params;

      const itemId = Object.values(params)[0];

      const item: any[] = await findItemFunc(itemId);

      if (item.length === 0) {
        throw new NotFound();
      }

      if (item[0].userId.valueOf() !== userId) {
        console.log(item[0].userId.valueOf());
        console.log(userId);
        throw new Forbidden();
      }
      next();
    } catch (error: any) {
      next(error);
    }
  };
}

export default allowToEdit;
