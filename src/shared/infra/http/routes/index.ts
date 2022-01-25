import { Router } from 'express';

import contactRoutes from '@modules/contacts/infra/http/routes/contact';
import tagsRoutes from '@modules/contacts/infra/http/routes/tags';
import messageRoutes from '@modules/messages/infra/http/routes/message';
import accessControl from '@modules/roles/infra/http/routes/accessControl';
import permissionsRoutes from '@modules/roles/infra/http/routes/permissions';
import rolesRoutes from '@modules/roles/infra/http/routes/roles';
import sessionRoutes from '@modules/users/infra/http/routes/sessions.routes';
import userRoutes from '@modules/users/infra/http/routes/users.routes';

const routes = Router();

routes.use('/contacts', contactRoutes);
routes.use('/tags', tagsRoutes);
routes.use('/messages', messageRoutes);
routes.use('/users', userRoutes);
routes.use('/sessions', sessionRoutes);
routes.use('/roles', rolesRoutes);
routes.use('/permissions', permissionsRoutes);
routes.use('/', accessControl);

export default routes;
