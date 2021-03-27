import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { POLICIES_KEY } from '../../interface-adapter/decorator/auth.decorator.require-policies';
import { CaslAbilityFactory } from '../casl/casl.ability.factorty';
import { Policy } from '../../application/entity/policy';
import { User } from '../../application/entity/user.entity';
import { IS_PUBLIC_KEY } from '../../interface-adapter/decorator/auth.decorator.public';

@Injectable()
export class PolicyAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector, private caslAbilityFactory: CaslAbilityFactory) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const requiredPolicies: Policy[] = this.reflector.getAllAndOverride<Policy[]>(POLICIES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    try {
      await super.canActivate(context);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
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

      console.log(
        `User ${user.username} ${hasAbility ? 'can' : 'cannot'} ${requiredAction.action} ${
          requiredAction.subject
        }`
      );
      return hasAbility;
    });
  }
}
