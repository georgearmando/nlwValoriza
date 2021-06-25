import { getCustomRepository } from 'typeorm';

import { Compliment } from '../entities/Compliment';
import { ComplimentRepository } from '../repositories/ComplimentRepository';

class ListUserSendComplimentsService {
  async execute(user_id: string): Promise<Compliment[]> {
    const complimentRepository = getCustomRepository(ComplimentRepository);

    const compliments = await complimentRepository.find({
      where: { user_sender: user_id },
      relations: ['userReceiver', 'tag'],
    });

    return compliments;
  }
}

export { ListUserSendComplimentsService };
