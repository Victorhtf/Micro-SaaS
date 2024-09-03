import { Request, Response, NextFunction } from 'express';

export abstract class BaseMiddleware {
  abstract handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
}
