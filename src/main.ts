import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cookieParser());
  app.set('trust proxy', 'loopback');
  app.enableCors({
    origin: [process.env.ORIGIN, 'https://zemios.com'].filter(Boolean) as string[],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization, X-Requested-With',
    credentials: true,
  }),
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
  await app.listen(process.env.PORT ?? 3000);
  console.log(`\nApp running in port: http://localhost:${process.env.PORT ?? 3000}`);
}
bootstrap();
