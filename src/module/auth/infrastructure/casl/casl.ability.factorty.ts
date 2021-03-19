// action, subject, fields, conditions
// you call defineAbility for can,cannot. Which subject can perform which actions on which fields, under which conditions.
// you load roles and permissions from database. Permissions exist in code. Why? Because you need to be explicit about which
// permissions exist in which places in your code, so it makes no sense to duplicate in the database.
// you only automate deciding which roles are assigned to which users
// and which permissions are assigned to which roles
// your code must not contain reference to users or roles, only to permissions.

// authorization: first, you decide if someone needs to be logged in or not
// if they don't, load it
// if they do, ask for login.
// once they log in, load user + role + permissions and configure them w/casl
// then you'll know if the user has a needed permission and then you can decide whether they can do it or not
// decision happens in guards?

import { Ability, AbilityBuilder } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { User } from '../../application/entity/user.entity';
import { AuthAction } from '../../application/auth.action';
import { Car } from '../../../car/car.entity';

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User): Ability {
    const { can, cannot, rules } = new AbilityBuilder(Ability);

    if (user.role.permissions) {
      can(AuthAction.Manage, 'all'); // read-write access to everything
    } else {
      can(AuthAction.Retrieve, 'all'); // read-only access to everything
    }

    can(AuthAction.Update, Car);
    cannot(AuthAction.Delete, Car);

    return new Ability(rules);
  }
}
