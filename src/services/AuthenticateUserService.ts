import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';

import { AppError } from '../errors/AppErrors';
import { UsersRepository } from '../repositories/UserRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  token: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IRequest): Promise<IResponse> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne({
      email,
    });

    if (!user) {
      throw new AppError('Email or password incorrect!');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Email or password incorrect!');
    }

    const token = sign(
      { email: user.email },
      '123228f3ce6fa8b0c525b17bfe3d6a91',
      {
        subject: user.id,
        expiresIn: '1d',
      },
    );

    const tokenReturn: IResponse = {
      token,
    };

    return tokenReturn;
  }
}

export { AuthenticateUserService };
