import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { CargoModule } from './modules/gestion-usuarios/cargo/cargo.module';
import { TipoUsuarioModule } from './modules/gestion-usuarios/tipo_usuario/tipo_usuario.module';
import { UsuariosModule } from './modules/gestion-usuarios/usuarios/usuarios.module';
import { ApiDniModule, ApiRucModule } from './services';

@Module({
  imports: [
    AuthModule,
    ApiRucModule,
    ApiDniModule,
    TipoUsuarioModule,
    CargoModule,
    UsuariosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
