import { Router } from 'express';

import accessControl from '@modules/accessControlList/infra/http/routes/accessControl';
import permissionsRoutes from '@modules/accessControlList/infra/http/routes/permissions';
import rolesRoutes from '@modules/accessControlList/infra/http/routes/roles';
import contactRoutes from '@modules/contacts/infra/http/routes/contact';
import tagsRoutes from '@modules/contacts/infra/http/routes/tags';
import messageRoutes from '@modules/messages/infra/http/routes/message';
import templateRoutes from '@modules/messages/infra/http/routes/template';
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
routes.use('/templates', templateRoutes);

export default routes;
