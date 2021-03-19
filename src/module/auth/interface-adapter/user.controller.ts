import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from '../application/user.service';
import { BaseController } from '../../../common/application/base.controller';
import { SecureUser } from './dto/secure-user.dto';
import { Public } from '../application/decorator/auth.decorator.public';

@Controller('users')
export class UserController extends BaseController {
  constructor(private service: UserService) {
    super();
  }

  @Get(':id')
  async get(@Param() params) {
    const user = await this.service.findOne(Number(params.id));
    return new SecureUser(user);
  }

  @Get()
  async getAll(): Promise<SecureUser[]> {
    const users = await this.service.findAll();
    return users.map((user) => new SecureUser(user));
  }
}
