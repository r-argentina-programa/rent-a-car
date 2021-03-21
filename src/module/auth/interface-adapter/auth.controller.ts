import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { BaseController } from '../../../common/application/base.controller';
import { LocalAuthGuard } from '../infrastructure/guard/local.auth.guard';
import { AuthService } from '../application/service/auth.service';
import { LoginRequestDto } from './dto/login-request.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { Public } from './decorator/auth.decorator.public';
import { SecureUser } from '../application/entity/secure-user.entity';

@Controller('auth')
export class AuthController extends BaseController {
  constructor(private authService: AuthService) {
    super();
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Body() user: LoginRequestDto, @Req() req): LoginResponseDto {
    const secureUser = new SecureUser(req.user);
    return new LoginResponseDto(this.authService.getAccessToken(secureUser));
  }
}
