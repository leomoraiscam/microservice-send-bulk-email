import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import AuthenticatedUserController from '@modules/users/infra/http/controllers/AuthenticatedUserController';

const authenticatedUserController = new AuthenticatedUserController();

const sessionRouter = Router();

sessionRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  authenticatedUserController.handle
);

export default sessionRouter;
