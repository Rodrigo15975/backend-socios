import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthData } from '../types/type-auth';
@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async signUp() {}
  async signIn(data: AuthData) {}
}
