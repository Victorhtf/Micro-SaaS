import { Router, Request, Response, NextFunction } from 'express';
import UserRoutes from './users';
import authRoutes from './auth';

const routes = Router();

// Definição das rotas
routes.use('/users', UserRoutes);
routes.use('/auth', authRoutes);

routes.get('/api', (req: Request, res: Response) => {
  res.json({ message: 'MicroSaaS - API Online' });
});

export default routes;
