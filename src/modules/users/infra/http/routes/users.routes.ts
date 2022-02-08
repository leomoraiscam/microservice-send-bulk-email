import { Router } from 'express';

import ListUsersController from '@modules/users/infra/http/controllers/ListUsersController';
import UsersController from '@modules/users/infra/http/controllers/UsersController';

const listUsersController = new ListUsersController();

const usersRouter = Router();

usersRouter.get('/', listUsersController.handle);
usersRouter.post('/', UsersController.create);

export default usersRouter;
