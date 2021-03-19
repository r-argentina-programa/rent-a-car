import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from '../application/user.service';
import { BaseController } from '../../../common/application/base.controller';
import { SecureUserDto } from './dto/secure-user.dto';
import { RequirePolicies } from '../application/decorator/auth.decorator.require-policies';
import { AuthAction } from '../application/entity/auth.action';
import { Policy } from '../application/entity/policy';

@Controller('users')
export class UserController extends BaseController {
  constructor(private service: UserService) {
    super();
  }

  @Get(':id')
  @RequirePolicies([new Policy(AuthAction.Retrieve, 'User')])
  async get(@Param() params) {
    const user = await this.service.findOne(Number(params.id));
    return new SecureUserDto(user);
  }

  @Get()
  async getAll(): Promise<SecureUserDto[]> {
    const users = await this.service.findAll();
    return users.map((user) => new SecureUserDto(user));
  }
}
