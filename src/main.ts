import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { typeOrmConfig } from './datasource/typeorm.config';
import * as _ from "lodash";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ["warn", "error"]
  });

  app.setGlobalPrefix("/api")

  const port = 5000;
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
