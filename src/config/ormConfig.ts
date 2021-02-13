import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const ormConfig: TypeOrmModuleOptions = {
    type: "postgres",
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'password',
    database: 'connectsdk',
    synchronize: true,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
}