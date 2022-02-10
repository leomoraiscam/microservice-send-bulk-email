import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import SessionController from '@modules/users/infra/http/controllers/SessionController';

const sessionRouter = Router();

sessionRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  SessionController.create
);

export default sessionRouter;
