import { Controller, Get, Param } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import { BaseController } from '../../common/base.controller';

@Controller('users')
export class UserController extends BaseController {
  constructor(private service: UserService) {
    super();
  }

  @Get(':id')
  getCar(@Param() params): Promise<User> {
    return this.service.findOne(Number(params.id));
  }

  @Get()
  getCars(): Promise<User[]> {
    return this.service.findAll();
  }
}
