import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'process';

import { AuthService } from './services/auth.service';
import { AuthJwt } from './jwt/auth-jwt';
import { AuthController } from '../controller/auth.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: env.SECRET_KEY_AUTH,
      signOptions: {
        algorithm: 'HS256',
        expiresIn: '1d',
      },
    }),
  ],
  providers: [AuthJwt, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
