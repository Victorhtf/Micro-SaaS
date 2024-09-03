import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import prismaClient from '../utils/PrismaClient';

dotenv.config();

class AuthController {
  async login(req: Request, res: Response) {
    const authHeader = req.headers.authorization;

    if (!authHeader || typeof authHeader !== 'string') {
      return res.status(400).json({ message: 'Invalid authorization header' });
    }

    // Split encryption scheme from credential
    const [scheme, credentials] = authHeader.split(' ');

    // Ensure the scheme is 'Basic'
    if (scheme !== 'Basic') {
      return res.status(400).json({ message: 'Invalid authorization scheme' });
    }

    // Decrypting credential
    const [username, password] = Buffer.from(credentials, 'base64')
      .toString()
      .split(':');

    // Check credentials in the database
    const user = await prismaClient.user.findUniqueOrThrow({
      where: { username },
    });

    const matchPassword = await this.comparePassword(password, user.password);

    if (!user || !matchPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { user: { id: user.id, username: user.username } },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );

    // Inject JWT token as a cookie
    res.cookie('token', token, {
      httpOnly: true, // Cookie only accessed by server, to avoid CRFS
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000, // 1 hour
    });

    return res.json({ message: 'User logged in', token });
  }

  private comparePassword(plainPassword: string, hash: string) {
    return bcrypt.compare(plainPassword, hash);
  }

  getCurrentUser(token: string) {
    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
      return decoded.user;
    } catch (error) {
      return null;
    }
  }

  validateToken(token: string) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      return decoded;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  private checkPermissions(
    token: string,
    urlPath: string,
    requestMethod: string
  ) {
    const user = this.getCurrentUser(token);
    if (!user) {
      return false;
    }

    // Implement your permission logic here
    return true;
  }
}

export default new AuthController();
