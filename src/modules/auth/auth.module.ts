import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { HandleErrors } from 'src/common';
import { CargoService } from '../gestion-usuarios/cargo/services/cargo.service';
import { TipoUsuarioService } from '../gestion-usuarios/tipo_usuario/services/tipo_usuario.service';
import { UsuariosService } from '../gestion-usuarios/usuarios/services/usuarios.service';
import { SharedMongodbModule } from '../shared/mongodb/Sharedmongodb.module';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './services/auth.service';
import { AuthJwt } from './jwt/auth-jwt';
import { constantsKey } from 'src/common/constants/constantsKey';

@Module({
  imports: [
    SharedMongodbModule,
    JwtModule.register({
      secret: constantsKey.secret,
      signOptions: {
        expiresIn: '1d',
      },
    }),
  ],
  providers: [
    AuthService,
    AuthJwt,
    UsuariosService,
    HandleErrors,
    CargoService,
    TipoUsuarioService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
