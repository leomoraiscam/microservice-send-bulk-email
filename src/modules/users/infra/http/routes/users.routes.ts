import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import CreateUserController from '@modules/users/infra/http/controllers/CreateUserController';

const createUserController = new CreateUserController();

const usersRouter = Router();

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  createUserController.handle
);

export default usersRouter;
