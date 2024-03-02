import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookie from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  // Habilitar el rawBody para stripe
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
  });
  const port = process.env.PORT || 4000;
  app.use(cookie());
  // configurar enableCors
  app.enableCors({
    origin: '*',
    methods: ['POST', 'GET', 'PUT', 'PATCH', 'DELETE'],
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
}
bootstrap();
