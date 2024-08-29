import express, { Express } from 'express';
import routes from './routes';
import Setup from './config/setup';

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
    this.express.use(express.json());
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
