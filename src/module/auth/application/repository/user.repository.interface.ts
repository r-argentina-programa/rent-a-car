import { User } from '../entity/user.entity';

export interface IUserRepository {
  findOneOrFail(id: string | number): Promise<User>;

  find(): Promise<User[]>;

  findOneByUsername(username: string): Promise<User>;
}
