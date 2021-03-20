import { Controller, Get, Param, Req } from '@nestjs/common';
import { UserService } from '../application/user.service';
import { BaseController } from '../../../common/application/base.controller';
import { SecureUserDto } from './dto/secure-user.dto';
import { RequirePolicies } from '../application/decorator/auth.decorator.require-policies';
import { AuthAction } from '../application/entity/auth.action';
import { Policy } from '../application/entity/policy';
import { User } from '../application/entity/user.entity';

@Controller('users')
export class UserController extends BaseController {
  constructor(private service: UserService) {
    super();
  }

  @Get('/')
  @RequirePolicies([new Policy(AuthAction.Manage, 'User')])
  async getAll(): Promise<SecureUserDto[]> {
    const users = await this.service.findAll();
    return users.map((user) => new SecureUserDto(user));
  }

  @Get('self')
  @RequirePolicies([new Policy(AuthAction.Retrieve, 'User')])
  async getSelf(@Req() req) {
    const loggedInUser: User = req.user;
    const user = await this.service.findOne(Number(loggedInUser.id));
    return new SecureUserDto(user);
  }

  @Get(':id')
  @RequirePolicies([new Policy(AuthAction.Manage, 'User')])
  async get(@Param() params) {
    const user = await this.service.findOne(Number(params.id));
    return new SecureUserDto(user);
  }
}
