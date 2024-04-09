import { Req } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { env } from 'process';

export class AuthJwt extends PassportStrategy(Strategy, env.PASSPORT_AUTH) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([AuthJwt.stractJwtRequest]),
      secretOrKey: env.SECRET_KEY_AUTH,
      expiration: true,
    });
  }

  private static stractJwtRequest(@Req() req: Request): string | null {
    if (req.cookies && req.cookies.auth) return req.cookies.auth;
    return null;
  }

  // Crear un tipado para el user
  async validate(user: any) {
    return user;
  }
}
