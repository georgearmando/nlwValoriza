import { Request, Response } from 'express';

import { CreateComplimentService } from '../services/CreateComplimentService';

class CreateComplimentController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_sender, user_receiver, tag_id, message } = request.body;

    const createComplimentService = new CreateComplimentService();

    const compliment = await createComplimentService.execute({
      user_sender,
      user_receiver,
      tag_id,
      message,
    });

    return response.status(200).json(compliment);
  }
}

export { CreateComplimentController };
