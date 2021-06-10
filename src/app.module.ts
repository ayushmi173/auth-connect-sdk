import { Logger, Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import connectionOptions from "./config/ormConfig";

@Module({
  imports: [
    TypeOrmModule.forRoot(connectionOptions),
    AuthModule,
    TerminusModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
