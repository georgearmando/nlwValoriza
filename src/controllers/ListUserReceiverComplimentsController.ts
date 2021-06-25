import { Request, Response } from 'express';

import { ListUserReceiverComplimentsService } from '../services/ListUserReceiverComplimentsService';

class ListUserReceiverComplimentsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const listUserReceiverComplimentsService =
      new ListUserReceiverComplimentsService();

    const compliments = await listUserReceiverComplimentsService.execute(id);

    return response.status(200).json(compliments);
  }
}

export { ListUserReceiverComplimentsController };
