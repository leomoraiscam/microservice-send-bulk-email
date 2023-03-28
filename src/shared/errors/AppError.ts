import HttpStatusCode from './StatusCodes';

class AppError {
  public readonly message: string;
  public readonly statusCode: HttpStatusCode;

  constructor(message, statusCode = HttpStatusCode.BAD_GATEWAY) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default AppError;
