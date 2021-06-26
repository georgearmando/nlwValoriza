import { Request, Response } from 'express';

import { ViewTagService } from '../services/ViewTagService';

class ViewTagController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.params;

    const viewTagService = new ViewTagService();

    const tag = await viewTagService.execute(name);

    return response.json(tag);
  }
}

export { ViewTagController };
