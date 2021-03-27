import { User } from '../entity/user.entity';
import { IUserRepository } from '../repository/user.repository.interface';

export class UserService {
  constructor(private repository: IUserRepository) {}

  findOne(id: number): Promise<User> {
    return this.repository.findOneOrFail(id);
  }

  findOneByUsername(username: string): Promise<User> {
    return this.repository.findOneByUsername(username);
  }

  findOneByExternalId(externalId: string): Promise<User> {
    return this.repository.findOneByExternalId(externalId);
  }

  findAll(): Promise<User[]> {
    return this.repository.find();
  }

  create(user: User): Promise<User> {
    return this.repository.save(user);
  }
}
