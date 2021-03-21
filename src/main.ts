import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './module/app.module';

async function bootstrap(port: number) {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Rent a Car')
    .setDescription('Descripción de la API de Rent a Car')
    .setVersion(process.env.VERSION)
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api', app, document);

  await app.listen(port);
}

const port = Number(process.env.PORT) || 3000;
bootstrap(port).then(() => process.stdout.write(`Bootstrap complete: http://localhost:${port}`));
