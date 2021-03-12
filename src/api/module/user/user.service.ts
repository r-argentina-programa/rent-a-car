import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private repository: UserRepository
  ) {}

  async findOne(id: number): Promise<User> {
    return this.repository.findOneOrFail(id);
  }

  findAll(): Promise<User[]> {
    return this.repository.find();
  }
}
