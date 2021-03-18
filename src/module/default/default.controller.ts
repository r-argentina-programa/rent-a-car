import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import routes from '@config/routes';
import { AuthService } from '../auth/application/auth.service';
import { AuthGuardLocal } from '../auth/application/guard/auth.guard.local';
import { AuthGuardJwt } from '../auth/application/guard/auth.guard.jwt';

@Controller()
export class DefaultController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuardLocal)
  @Post('auth/login')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuardJwt)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }

  @Get(routes.default.root)
  redirect(@Res() res) {
    return res.redirect(routes.reservation.root);
  }
}
