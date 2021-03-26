import { Controller, Get, Param, Req } from '@nestjs/common';
import { UserService } from '../application/service/user.service';
import { BaseController } from '../../../common/application/base.controller';
import { UserDto } from './dto/user.dto';
import { RequirePolicies } from './decorator/auth.decorator.require-policies';
import { AuthAction } from '../application/entity/auth.action';
import { Policy } from '../application/entity/policy';
import { User } from '../application/entity/user.entity';

@Controller('users')
export class UserController extends BaseController {
  constructor(private service: UserService) {
    super();
  }

  @Get('/')
  @RequirePolicies([new Policy(AuthAction.Retrieve, 'User')])
  async getAll(): Promise<UserDto[]> {
    const users = await this.service.findAll();
    return users.map((user) => new UserDto(user));
  }

  @Get('self')
  @RequirePolicies([new Policy(AuthAction.ReadSelf, 'User')])
  async getSelf(@Req() req): Promise<UserDto> {
    const loggedInUser: User = req.user;
    return new UserDto(loggedInUser);
  }

  @Get(':id')
  @RequirePolicies([new Policy(AuthAction.Retrieve, 'User')])
  async get(@Param() params): Promise<UserDto> {
    const user = await this.service.findOne(Number(params.id));
    return new UserDto(user);
  }
}
