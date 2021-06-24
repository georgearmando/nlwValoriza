import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';

import { User } from '../entities/User';
import { AppError } from '../errors/AppErrors';
import { UsersRepository } from '../repositories/UserRepository';

interface IUserRequest {
  name: string;
  email: string;
  admin?: boolean;
  password: string;
}

class CreateUserService {
  async execute({
    name,
    email,
    admin = false,
    password,
  }: IUserRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    if (!email) {
      throw new AppError('Email incorrect');
    }

    const userAlreadyExists = await usersRepository.findOne({
      email,
    });

    if (userAlreadyExists) {
      throw new AppError('User already exists!');
    }

    const passwordHash = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      admin,
      password: passwordHash,
    });

    await usersRepository.save(user);

    return user;
  }
}

export { CreateUserService };
