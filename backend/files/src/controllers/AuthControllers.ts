import { Request, Response } from 'express';
import prismaClient from '../utils/PrismaClient';

class AuthController {
  static async login(req: Request, res: Response) {
    const authHeader = req.headers.authorization;

    if (typeof authHeader !== 'string') {
      return res.json({ message: 'Invalid authorization header' });
    }

    // Split encryptation scheme from credential
    const [scheme, credentials] = authHeader.split(' ');

    // Decryptying credential
    const [username, password] = Buffer.from(credentials, 'base64')
      .toString()
      .split(':');

    res.json({ message: 'User logged', data: {} });
  }
}

export default AuthController;
