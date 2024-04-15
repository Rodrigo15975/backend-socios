import { Req } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../types/type-auth';
import { constantsKey } from 'src/common/constants/constantsKey';

export class AuthJwt extends PassportStrategy(Strategy, 'auth-jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([AuthJwt.stractJwtRequest]),
      secretOrKey: constantsKey.secret,
      ignoreExpiration: false,
    });
  }

  private static stractJwtRequest(@Req() req: Request): string | null {
    if (req.cookies && req.cookies.auth) return req.cookies.auth;
    return null;
  }

  // Crear un tipado para el user
  async validate(user: User) {
    return user;
  }
}
