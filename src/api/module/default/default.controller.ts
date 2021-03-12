import { Controller, Get, Res } from '@nestjs/common';

@Controller()
export class DefaultController {
  @Get('/')
  redirect(@Res() res) {
    return res.redirect('/reservations');
  }
}
