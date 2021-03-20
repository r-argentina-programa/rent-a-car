import { AbstractRepository, EntityRepository } from 'typeorm';
import { UserSchema } from './user.schema';
import { User } from '../../application/entity/user.entity';
import { IUserRepository } from '../../application/repository/user.repository.interface';

@EntityRepository(UserSchema)
export class UserTypeormRepository extends AbstractRepository<User> implements IUserRepository {
  find(): Promise<User[]> {
    return this.repository.find();
  }

  findOneOrFail(id: string | number): Promise<User> {
    return this.repository.findOneOrFail(id, {
      relations: ['role', 'role.permissions'],
    });
  }

  findOneByUsername(username: string): Promise<User> {
    return this.repository.findOneOrFail({
      where: {
        username,
      },
      relations: ['role', 'role.permissions'],
    });
  }
}
