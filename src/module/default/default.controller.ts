import { Controller, Get, Res } from '@nestjs/common';
import routes from '@config/routes';

@Controller()
export class DefaultController {
  @Get(routes.default.root)
  redirect(@Res() res) {
    return res.redirect(routes.reservation.root);
  }
}
