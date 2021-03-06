import { getCustomRepository } from 'typeorm';

import { Tag } from '../entities/Tag';
import { AppError } from '../errors/AppErrors';
import { TagRepository } from '../repositories/TagRepository';

class CreateTagService {
  async execute(name: string): Promise<Tag> {
    const tagRepository = getCustomRepository(TagRepository);

    if (!name) {
      throw new Error('Incorrect name');
    }

    const tagAlreadyExists = await tagRepository.findOne({
      name,
    });

    if (tagAlreadyExists) {
      throw new AppError('Tag already exists');
    }

    const tag = tagRepository.create({
      name,
    });

    await tagRepository.save(tag);

    return tag;
  }
}

export { CreateTagService };
