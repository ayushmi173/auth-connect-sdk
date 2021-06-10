import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as dotenv from "dotenv";
import { Logger } from "@nestjs/common";

async function bootstrap() {
  const logger = new Logger("Bootstrap");
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT;
  app.enableCors();
  await app.listen(port);
  logger.log(`Application running on Port: ${port}`);
}
bootstrap();
