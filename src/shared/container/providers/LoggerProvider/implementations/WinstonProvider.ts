import winston, { createLogger, Logger, LoggerOptions } from 'winston';

import ILoggerProvider from '../models/ILoggerProvider';

class WinstonProvider implements ILoggerProvider {
  private logger: Logger;

  log(level: string, message: string, metadata?: object): void {
    this.logger = createLogger({
      level,
      format: winston.format.json(),
    });

    this.logger.log(level, message, { metadata });
  }
}

export default WinstonProvider;
