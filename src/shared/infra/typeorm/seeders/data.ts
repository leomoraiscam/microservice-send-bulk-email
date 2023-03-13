import { RoleEnum } from '@modules/accessControlList/dtos/enuns/rolesEnum';

export const rolesData = [
  {
    name: RoleEnum.ADMIN,
    description:
      'The administrator account, as you might guess, can make changes that affect other users.',
  },
  {
    name: RoleEnum.SENDER,
    description: 'The sender account, can send emails to other contacts.',
  },
  {
    name: RoleEnum.VIEW,
    description:
      'The viewers account can view the data without modification privileges or send data to contacts.',
  },
];

export const permissionsData = [
  {
    name: 'create-sender',
    description:
      'The create sender permission may allow some users to send email to contacts.',
  },
  {
    name: 'create-role',
    description:
      'The role creation role can allow new roles to be registered in the database.',
  },
  {
    name: 'create-permission',
    description:
      'The permission creation permission can allow new permissions to be registered in the database.',
  },
  {
    name: 'create-broadcast',
    description:
      'The permission create crate broadcast permission can allow new messages, templates and recipients to be registered in the database.',
  },
  {
    name: 'create-subscription',
    description:
      'The permission create crate subscription permission can allow new contacts and tags to be registered in the database.',
  },
  {
    name: 'send-email',
    description:
      'The send email permission can allow senders users to send transactional emails to multiple contacts according to their tags.',
  },
  {
    name: 'list-sender',
    description: 'The permission can list all senders users',
  },
];
