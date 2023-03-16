import { Router } from 'express';

import accessControlList from '@modules/accessControlList/infra/http/routes/accessControlList';
import permissionsRoutes from '@modules/accessControlList/infra/http/routes/permissions';
import rolesRoutes from '@modules/accessControlList/infra/http/routes/roles';
import contactRoutes from '@modules/contacts/infra/http/routes/contacts';
import tagsRoutes from '@modules/contacts/infra/http/routes/tags';
import messageRoutes from '@modules/messages/infra/http/routes/messages';
import templateRoutes from '@modules/messages/infra/http/routes/templates';
import sessionRoutes from '@modules/users/infra/http/routes/sessions.routes';
import userRoutes from '@modules/users/infra/http/routes/users.routes';

const routes = Router();

routes.get('/', (req, res) => {
  res.status(204).send();
});
routes.use('/sessions', sessionRoutes);
routes.use('/users', userRoutes);
routes.use('/contacts', contactRoutes);
routes.use('/tags', tagsRoutes);
routes.use('/messages', messageRoutes);
routes.use('/templates', templateRoutes);
routes.use('/roles', rolesRoutes);
routes.use('/permissions', permissionsRoutes);
routes.use('/', accessControlList);

export default routes;
