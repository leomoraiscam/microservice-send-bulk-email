import { Router } from 'express';

import UsersController from '@modules/users/infra/http/controllers/UsersController';

const usersRouter = Router();

usersRouter.post('/', UsersController.create);

export default usersRouter;
