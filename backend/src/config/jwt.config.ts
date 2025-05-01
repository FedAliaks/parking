import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModuleAsyncOptions } from '@nestjs/jwt';

export const jwtModuleConfig: JwtModuleAsyncOptions = {
  global: true,
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    secret: config.get<string>('JWT_SECRET') || 'defaultSecret',
    signOptions: { expiresIn: '1h' },
  }),
};
