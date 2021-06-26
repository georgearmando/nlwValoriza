import { getCustomRepository } from 'typeorm';

import { AppError } from '../errors/AppErrors';
import { TagRepository } from '../repositories/TagRepository';

class ViewTagService {
  async execute(name: string) {
    const tagRepository = getCustomRepository(TagRepository);

    const tag = await tagRepository.findOne({ name });

    if (!tag) {
      throw new AppError('Tag does not exists');
    }

    return tag;
  }
}

export { ViewTagService };
