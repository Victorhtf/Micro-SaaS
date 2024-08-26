import { Request, Response } from 'express';

class AuthController {
  static async login(req: Request, res: Response) {
    return 'Logged';
  }
}

export default AuthController;
