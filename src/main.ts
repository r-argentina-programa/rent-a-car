import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app.module';

const port = Number(process.env.PORT) || 3000;

async function bootstrap(port: number) {
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
}

bootstrap(port).then(() => process.stdout.write(`Bootstrap complete: http://localhost:${port}`));
