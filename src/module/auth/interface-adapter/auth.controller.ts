import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { BaseController } from '../../../common/application/base.controller';
import { LocalAuthGuard } from '../application/guard/local.auth.guard';
import { AuthService } from '../application/auth.service';
import { LoginRequestDto } from './dto/login.request.dto';
import { LoginResponseDto } from './dto/login.response.dto';
import { SecureUserDto } from './dto/secure-user.dto';
import { Public } from '../application/decorator/auth.decorator.public';

@Controller('auth')
export class AuthController extends BaseController {
  constructor(private authService: AuthService) {
    super();
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Body() user: LoginRequestDto, @Req() req): LoginResponseDto {
    const secureUser = new SecureUserDto(req.user);
    return new LoginResponseDto(this.authService.getAccessToken(secureUser));
  }
}
