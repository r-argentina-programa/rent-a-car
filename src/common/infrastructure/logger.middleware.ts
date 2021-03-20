import { NextFunction, Request, Response } from 'express';

export function logger(req: Request, res: Response, next: NextFunction) {
  // eslint-disable-next-line no-console
  console.log(`\nRequest a ${req.originalUrl}`);
  next();
}
