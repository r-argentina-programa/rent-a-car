import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { UserSchema } from './user.schema.';

@EntityRepository(UserSchema)
export class UserRepository extends Repository<User> {}
