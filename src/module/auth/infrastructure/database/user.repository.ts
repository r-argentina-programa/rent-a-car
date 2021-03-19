import { EntityRepository, Repository } from 'typeorm';
import { UserSchema } from './user.schema';
import { User } from '../../application/entity/user.entity';

@EntityRepository(UserSchema)
export class UserRepository extends Repository<User> {}
