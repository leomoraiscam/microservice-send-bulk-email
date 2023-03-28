interface IMailConfig {
  driver: 'ethereal' | 'ses' | 'mailtrap';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
  config: {
    ses: {};
    ethereal: {};
    mailtrap: {
      host: string;
      port: number;
      auth: {
        user: string;
        pass: string;
      };
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'mailtrap',
  defaults: {
    from: {
      email: 'sender-bulkmessage@example.com',
      name: 'bulk-message',
    },
  },

  config: {
    ses: {},
    ethereal: {},
    mailtrap: {
      host: process.env.MAILTRAP_HOST || 'smtp.mailtrap.io',
      port: Number(process.env.MAILTRAP_PORT),
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    },
  },
} as IMailConfig;
