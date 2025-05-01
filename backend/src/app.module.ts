import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtModuleConfig, typeOrmConfig } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeOrmConfig),
    JwtModule.registerAsync(jwtModuleConfig),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [JwtModule],
})
export class AppModule {}
