import { SetMetadata } from '@nestjs/common';
import { Policy } from '../entity/policy';

export const POLICIES_KEY = 'policies';
export const RequirePolicies = (policies: Policy[]) => {
  return SetMetadata(POLICIES_KEY, policies);
};
