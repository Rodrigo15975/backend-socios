import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthUserGuard } from '../guards/auth-guards';
import { AuthService } from '../services/auth.service';
import { AuthData } from '../types/type-auth';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() data: AuthData) {
    const auth = await this.authService.signIn(data);
    return { auth };
  }

  @UseGuards(AuthUserGuard)
  @Get('profile')
  async getProfile(@Req() req: Request) {
    return req.user;
  }

  @UseGuards(AuthUserGuard)
  @Get('verify')
  tokenSuccess() {
    return {
      success: true,
      statusCode: 200,
      message: 'Verification successful!',
    };
  }

  @UseGuards(AuthUserGuard)
  @Get('logout')
  logout() {
    return { message: 'Sesión cerrada' };
  }
}
