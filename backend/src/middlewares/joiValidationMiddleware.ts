import { NextFunction, Request, Response } from 'express';
import { BadRequest } from 'http-errors';

function joiValidation(validationFunc: any) {
  return function (request: Request, response: Response, next: NextFunction) {
    try {
      const { error } = validationFunc.validate(request.body);
      if (error) {
        throw new BadRequest(error.message);
      }
      next();
    } catch (error: any) {
      next(error);
    }
  };
}

export default joiValidation;
