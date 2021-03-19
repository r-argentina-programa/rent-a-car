import { AuthAction } from './auth.action';

export class Policy {
  constructor(public action: AuthAction, public subject: string) {}
}
