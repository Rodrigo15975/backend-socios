import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HandleErrors } from 'src/common';
import { verifyPassword } from 'src/common/utils/argon2/argonHash';
import { UsuariosService } from 'src/modules/gestion-usuarios/usuarios/services/usuarios.service';
import { AuthData } from '../types/type-auth';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usuariosServices: UsuariosService,
    private readonly handlesErrors: HandleErrors,
  ) {}

  async signIn(authData: AuthData) {
    const { contraseña, dni } = authData;
    // return console.log(contraseña, dni);

    const usuario = await this.usuariosServices.findByDni(dni);

    const hash = await verifyPassword(usuario.contraseña, contraseña);
    if (!hash)
      this.handlesErrors.handleErrorsBadRequestException(
        'Verifique sus credenciales',
      );
    const token = await this.getToken(usuario.id);

    return token;
  }

  async getToken(id: string) {
    const payload = { id };
    const accessToken = await this.jwtService.signAsync(payload);
    return accessToken;
  }
}
