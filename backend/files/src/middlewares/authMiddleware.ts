import { Request, Response, NextFunction } from 'express';
import { BaseMiddleware } from './baseMiddleware';
import AuthControllers from '../controllers/AuthControllers';
import whitelistRoutes from '../config/whitelistRoutes';

interface CustomRequest extends Request {
  user?: any;
}

export class AuthMiddleware extends BaseMiddleware {
  constructor(private AuthController: typeof AuthControllers) {
    super();
  }

  async handle(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { path: urlPath, method: requestMethod, cookies } = req;
    let token: string | undefined;

    // Verify if the route is on whitelist
    if (whitelistRoutes.includes(urlPath)) {
      next();
      return;
    }

    if (cookies && cookies.token) {
      token = cookies.token;
    }

    if (!token) {
      res.status(403).json({ detail: 'Forbidden' });
      return;
    }

    try {
      const decodedToken = this.AuthController.validateToken(token);

      // Verify if the token was successfully decoded
      if (!decodedToken) {
        res.status(403).json({ detail: 'Invalid token' });
        return;
      }

      const user = this.AuthController.getCurrentUser(token!);

      if (!user) {
        res.status(403).json({ detail: 'Forbidden' });
        return;
      }

      // Check for user permissions
      const hasPermissions = await this.AuthController.checkPermissions(
        token,
        urlPath,
        requestMethod
      );

      if (!hasPermissions) {
        res.status(403).json({ detail: 'Forbidden' });
        return;
      }

      // Attach current user for next routes
      req.user = user;

      // Continue to next route
      next();
    } catch (error) {
      res.status(403).json({ detail: 'Forbidden' });
      return;
    }
  }
}
