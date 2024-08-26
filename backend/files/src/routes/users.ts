import { Router } from 'express';
import users from '../controllers/UsersControllers';

const routes = Router();

routes.post('/', users.create);
routes.get('/', users.getAll);
routes.get('/:id', users.getOne);
routes.patch('/:id', users.update);
routes.delete('/:id', users.delete);

export default routes;
