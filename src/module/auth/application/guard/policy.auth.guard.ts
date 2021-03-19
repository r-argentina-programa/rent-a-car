import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { POLICIES_KEY } from '../decorator/auth.decorator.require-policies';
import { CaslAbilityFactory } from '../../infrastructure/casl/casl.ability.factorty';
import { Policy } from '../entity/policy';
import { JwtAuthGuard } from './jwt.auth.guard';

// Tarea: Crear un AnyPolicyAuthGuard y un EveryPolicyAuthGuard
@Injectable()
export class PolicyAuthGuard extends JwtAuthGuard {
  constructor(reflector: Reflector, private caslAbilityFactory: CaslAbilityFactory) {
    super(reflector);
  }

  async canActivate(context: ExecutionContext) {
    // revisar
    const requiredActions: Policy[] = this.reflector.getAllAndOverride<Policy[]>(POLICIES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    try {
      await super.canActivate(context);
    } catch (e) {
      return false;
    }

    if (!requiredActions) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if (!user) {
      return false;
    }

    const userAbility = this.caslAbilityFactory.createForUser(user);

    return requiredActions.every((requiredAction: Policy) =>
      userAbility.can(requiredAction.action, requiredAction.subject)
    );
  }
}
