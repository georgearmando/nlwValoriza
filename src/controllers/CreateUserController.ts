import { Request, Response } from 'express';

import { CreateUserService } from '../services/CreateUserService';

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, admin } = request.body;

    const createUserService = new CreateUserService();

    try {
      const user = await createUserService.execute({ name, email, admin });

      return response.status(201).json(user);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export { CreateUserController };
