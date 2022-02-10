import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import ListUsersController from '@modules/users/infra/http/controllers/ListUsersController';
import UsersController from '@modules/users/infra/http/controllers/UsersController';

const listUsersController = new ListUsersController();

const usersRouter = Router();

usersRouter.get('/', listUsersController.handle);
usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  UsersController.create
);

export default usersRouter;
