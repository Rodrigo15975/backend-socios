import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookie from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { config } from 'dotenv';
async function bootstrap() {
  config();
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 4000;
  app.use(cookie());
  // configurar enableCors
  app.enableCors({
    origin: '*',
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
}
bootstrap();
