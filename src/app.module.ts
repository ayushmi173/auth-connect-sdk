import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ormConfig } from './config/ormConfig';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig),AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
