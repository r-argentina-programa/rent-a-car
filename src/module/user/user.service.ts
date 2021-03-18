import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './domain/user.entity';
import { UserRepository } from './infrastructure/database/user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private repository: UserRepository
  ) {}

  findOne(id: number): Promise<User> {
    return this.repository.findOneOrFail(id);
  }

  findOneByUsername(username: string): Promise<User> {
    return this.repository.findOneOrFail({
      where: {
        username,
      },
    });
  }

  findAll(): Promise<User[]> {
    return this.repository.find();
  }
}
