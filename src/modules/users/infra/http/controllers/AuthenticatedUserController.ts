import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticatedUserService from '@modules/users/services/AuthenticatedUserService';

class AuthenticatedUserController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticatedUser = container.resolve(AuthenticatedUserService);

    const { user, token } = await authenticatedUser.execute({
      email,
      password,
    });

    return response.json({ user: classToClass(user), token });
  }
}

export default AuthenticatedUserController;
