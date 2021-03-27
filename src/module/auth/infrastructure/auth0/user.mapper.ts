import { User } from '../../application/entity/user.entity';
import { Role } from '../../application/entity/role.entity';
import { Permission } from '../../application/entity/permission.entity';
import { AuthAction } from '../../application/entity/auth.action';

export type Auth0UserDto = {
  'http://rent-a-car/roles': string[];
  'http://rent-a-car/user': { email: string };
  iss: string;
  sub: string;
  aud: string[];
  iat: number;
  exp: number;
  azp: string;
  scope: string;
  permissions: string[];
};

export function populatePermissions(originalUser: User, userDto: Auth0UserDto) {
  const role = new Role();
  role.name = userDto[`http://rent-a-car/roles`].pop();

  role.permissions = userDto.permissions.map((permission) => {
    const newPermission = new Permission();
    const [action, subject] = permission.split(':');
    newPermission.action = action as AuthAction;
    newPermission.subject = subject;
    return newPermission;
  });

  originalUser.role = role;
  return originalUser;
}

export function mapUser(userDto: Auth0UserDto): User {
  const auth0User = userDto['http://rent-a-car/user'];
  const user = new User();

  user.externalId = userDto.sub;
  user.username = auth0User.email;

  populatePermissions(user, userDto);
  return user;
}
