import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import AuthenticateUserController from '@modules/users/infra/http/controllers/AuthenticateUserController';

const authenticateUserController = new AuthenticateUserController();

const sessionRouter = Router();

sessionRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  authenticateUserController.handle
);

export default sessionRouter;
