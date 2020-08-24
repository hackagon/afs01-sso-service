import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { typeOrmConfig } from './datasource/typeorm.config';
import * as _ from "lodash";
import {
  ValidationPipe,
  BadRequestException,
  INestApplication,
} from '@nestjs/common';
import { ValidationError, useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ["warn", "error"]
  });

  app.setGlobalPrefix("/api")

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        return new BadRequestException(validationErrors);
      },
      validationError: {
        target: false,
      },
    }),
  );

  const port = process.env.PORT || 5001;
  await app.listen(port, () => {
    console.log("App is running on:")
    console.table({
      port,
      environment: "local",
      "db host": _.get(typeOrmConfig, "host")
    })
  });
}
bootstrap();
