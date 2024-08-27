import { Router, Request, Response } from 'express';
import auth from '../controllers/AuthControllers';

const routes = Router();

routes.post('/login', auth.login);

export default routes;
