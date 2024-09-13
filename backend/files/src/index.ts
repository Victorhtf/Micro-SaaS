import express, { Express, Request, Response, NextFunction } from 'express';
import AuthController from './controllers/AuthControllers';
import { AuthMiddleware } from './middlewares/authMiddleware';
import routes from './routes';
import cookieParser from 'cookie-parser';
import Setup from './config/setup';
import cors from 'cors';

class App {
  private express: Express;

  constructor() {
    this.express = express();
  }

  start(): void {
    Setup.load();
    this.middlewares();
    this.startRoutes();
    this.serverListen();
  }

  // Set up the middlewares
  private middlewares(): void {
    const authMiddleware = new AuthMiddleware(AuthController);

    this.express.use(express.json());
    this.express.use(cookieParser());
    this.express.use(cors({ origin: process.env.FRONTEND_URI }));
    this.express.use((req: Request, res: Response, next: NextFunction) => {
      authMiddleware.handle(req, res, next);
    });
  }

  private startRoutes(): void {
    this.express.use(routes);
  }

  private serverListen(): void {
    const port = Setup.SERVER_PORT;

    this.express.listen(port, () => {
      console.log('\n[SERVER] Server starting.');
      console.log(`[SERVER] Server running on port ${port}.\n`);
    });
  }
}

new App().start();
