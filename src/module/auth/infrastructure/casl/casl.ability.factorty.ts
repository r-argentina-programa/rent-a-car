import { Ability, AbilityBuilder } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { User } from '../../application/entity/user.entity';

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User): Ability {
    const { can, rules } = new AbilityBuilder(Ability);
    const { permissions } = user.role;

    // eslint-disable-next-line no-console
    console.log(`Definiendo permisos para usuario ${user.username} (${user.id})`);
    // eslint-disable-next-line no-console
    console.table(permissions);

    permissions.forEach((permission) => {
      can(permission.action, permission.subject);
    });

    return new Ability(rules);
  }
}
