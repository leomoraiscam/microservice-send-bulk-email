import { Router } from 'express';

import SessionController from '@modules/users/infra/http/controllers/SessionController';

const sessionRouter = Router();

sessionRouter.post('/', SessionController.create);

export default sessionRouter;
