import { User } from '../entity/user.entity';

export interface IUserRepository {
  findOneOrFail(id: string): Promise<User>;

  findOneOrFail(id: number): Promise<User>;

  find(): Promise<User[]>;

  findOneByUsername(username: string): Promise<User>;
}
