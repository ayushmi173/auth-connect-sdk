import * as dotenv from "dotenv";
import { ConnectionOptions } from "typeorm";

dotenv.config();

export const ENVIRONMENT_VARIABLES = {
  POSTGRES_USER: "POSTGRES_USER",
  POSTGRES_HOST: "POSTGRES_HOST",
  POSTGRES_PORT: "POSTGRES_PORT",
  POSTGRES_PASSWORD: "POSTGRES_PASSWORD",
  POSTGRES_DATABASE: "POSTGRES_DATABASE",
};

export default {
  type: "postgres",
  host: process.env[ENVIRONMENT_VARIABLES.POSTGRES_HOST],
  port: Number(process.env[ENVIRONMENT_VARIABLES.POSTGRES_PORT]),
  username: process.env[ENVIRONMENT_VARIABLES.POSTGRES_USER],
  password: process.env[ENVIRONMENT_VARIABLES.POSTGRES_PASSWORD],
  database: process.env[ENVIRONMENT_VARIABLES.POSTGRES_DATABASE],
  synchronize: true,
  migrationsRun: true,
  entities: [__dirname + "/../**/*.entity.{js,ts}"],
  migrations: [__dirname + "src/migrations/*{.ts,.js}"],
  cli: {
    migrationsDir: "src/migrations",
  },
} as ConnectionOptions;
