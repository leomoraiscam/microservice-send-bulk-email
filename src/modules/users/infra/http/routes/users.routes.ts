import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import CreateUserController from '@modules/users/infra/http/controllers/CreateUserController';
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import { can, is } from '@shared/infra/http/middlewares/ensurePermission';

const createUserController = new CreateUserController();

const userRouter = Router();

userRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  ensureAuthenticated,
  // is(['admin']),
  // can(['create-sender']),
  createUserController.handle
);

export default userRouter;
