import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { TransformInterceptor } from './common/transform-data/transform.intercepter';

require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useLogger(new Logger());

  const reflector = app.get(Reflector);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor(reflector));

  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true,
    // exposedHeaders: ["set-cookie"]
  });

  app.use(cookieParser());

  const port: number | string = process.env.PORT;
  await app.listen(port, () => {
    console.log(`App listening on port ${port}`);
  });
}

bootstrap();
