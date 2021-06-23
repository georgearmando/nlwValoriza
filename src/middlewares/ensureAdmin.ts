import { Request, Response, NextFunction } from 'express';

import { AppError } from '../errors/AppErrors';

export function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const admin = true;

  if (!admin) {
    throw new AppError('Unauthorized', 401);
  }

  next();
}
