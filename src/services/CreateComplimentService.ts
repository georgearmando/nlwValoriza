import { getCustomRepository } from 'typeorm';

import { Compliment } from '../entities/Compliment';
import { AppError } from '../errors/AppErrors';
import { ComplimentRepository } from '../repositories/ComplimentRepository';
import { TagRepository } from '../repositories/TagRepository';
import { UsersRepository } from '../repositories/UserRepository';

interface IComplimentRequest {
  user_sender: string;
  user_receiver: string;
  tag_id: string;
  message: string;
}

class CreateComplimentService {
  async execute({
    user_sender,
    user_receiver,
    tag_id,
    message,
  }: IComplimentRequest): Promise<Compliment> {
    const complimentRepository = getCustomRepository(ComplimentRepository);
    const usersRepository = getCustomRepository(UsersRepository);
    const tagRepository = getCustomRepository(TagRepository);

    const userReceiverExists = await usersRepository.findOne(user_receiver);
    const tagExists = await tagRepository.findOne(tag_id);

    if (!userReceiverExists) {
      throw new AppError('User receiver not exists');
    }

    if (user_sender === user_receiver) {
      throw new AppError('You can not send a tag to your self');
    }

    if (!tagExists) {
      throw new AppError('Tag not exists');
    }

    const compliment = complimentRepository.create({
      user_sender,
      user_receiver,
      tag_id,
      message,
    });

    await complimentRepository.save(compliment);

    return compliment;
  }
}

export { CreateComplimentService };
