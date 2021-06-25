import { Request, Response } from 'express';

import { ListUserSendComplimentsService } from '../services/ListUserSenderComplimentsService';

class ListUserSendComplimentsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const listUserSendComplimentsService = new ListUserSendComplimentsService();
    const compliments = await listUserSendComplimentsService.execute(id);

    return response.status(200).json(compliments);
  }
}

export { ListUserSendComplimentsController };
