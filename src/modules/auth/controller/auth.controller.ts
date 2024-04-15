import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UsuariosService } from 'src/modules/gestion-usuarios/usuarios/services/usuarios.service';
import { AuthUserGuard } from '../guards/auth-guards';
import { AuthService } from '../services/auth.service';
import { AuthData } from '../types/type-auth';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usuarioServices: UsuariosService,
  ) {}

  @Post('login')
  async login(@Body() data: AuthData, @Res() res: Response) {
    const auth = await this.authService.signIn(data);
    // return { auth };
    res.cookie('auth', auth);
    res.send({});
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
