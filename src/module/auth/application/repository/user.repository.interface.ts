import { User } from '../entity/user.entity';
import { IBaseRepository } from '../../../../common/application/base.repository.interface';

export interface IUserRepository extends IBaseRepository<User> {
  findOneByUsername(username: string): Promise<User>;
}
