import { Router } from 'express';

import contactRoutes from '@modules/contacts/infra/http/routes/contact';
import tagsRoutes from '@modules/contacts/infra/http/routes/tags';
import messageRoutes from '@modules/messages/infra/http/routes/message';

const routes = Router();

routes.use('/contacts', contactRoutes);
routes.use('/tags', tagsRoutes);
routes.use('/messages', messageRoutes);

export default routes;
