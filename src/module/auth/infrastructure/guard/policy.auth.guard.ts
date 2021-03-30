import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { POLICIES_KEY } from '../../interface-adapter/decorator/auth.decorator.require-policies';
import { CaslAbilityFactory } from '../casl/casl.ability.factorty';
import { Policy } from '../../application/entity/policy';
import { JwtAuthGuard } from './jwt.auth.guard';
import { User } from '../../application/entity/user.entity';

// Tarea: Modificar este PolicyAuthGuard (y cualquier otro archivo necesario)
// para que permita verificar que TODOS los policies estén presentes (actualmente chequea que alguno exista)
@Injectable()
export class PolicyAuthGuard extends JwtAuthGuard {
  constructor(reflector: Reflector, private caslAbilityFactory: CaslAbilityFactory) {
    super(reflector);
  }

  async canActivate(context: ExecutionContext) {
    // revisar
    const requiredPolicies: Policy[] = this.reflector.getAllAndOverride<Policy[]>(POLICIES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    try {
      await super.canActivate(context);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('JWT Token no válido: ', e);
      return false;
    }

    if (!requiredPolicies) {
      return true;
    }

    const { user }: { user: User } = context.switchToHttp().getRequest();

    if (!user) {
      return false;
    }

    const userAbility = this.caslAbilityFactory.createForUser(user);

    return requiredPolicies.every((requiredAction: Policy) => {
      const hasAbility = userAbility.can(requiredAction.action, requiredAction.subject);

      // eslint-disable-next-line no-console
      console.log(
        `User ${user.username} ${hasAbility ? 'can' : 'cannot'} ${requiredAction.action} ${
          requiredAction.subject
        }`
      );
      return hasAbility;
    });
  }
}
