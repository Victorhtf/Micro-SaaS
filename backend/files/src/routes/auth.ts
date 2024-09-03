import { Router } from 'express';
import authController from '../controllers/AuthControllers';

const routes = Router();

routes.post('/login', authController.login.bind(authController));

export default routes;
