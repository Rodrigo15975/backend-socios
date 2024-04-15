import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { CargoModule } from './modules/gestion-usuarios/cargo/cargo.module';
import { TipoUsuarioModule } from './modules/gestion-usuarios/tipo_usuario/tipo_usuario.module';
import { UsuariosModule } from './modules/gestion-usuarios/usuarios/usuarios.module';
import { ApiDniModule, ApiRucModule } from './services';
import { CloudinaryModule } from './services/cloudinary/cloudinary.module';
import { EmpresaModule } from './modules/empresa/empresa.module';
import { SectorModule } from './modules/gestion-socios/sector/sector.module';
import { ActividadModule } from './modules/gestion-socios/actividad/actividad.module';
import { TipoSocioModule } from './modules/gestion-socios/tipo-socio/tipo-socio.module';
import { SociosModule } from './modules/gestion-socios/socios/socios.module';

@Module({
  imports: [
    CloudinaryModule,
    AuthModule,
    ApiRucModule,
    ApiDniModule,
    TipoUsuarioModule,
    CargoModule,
    UsuariosModule,
    EmpresaModule,
    SectorModule,
    ActividadModule,
    TipoSocioModule,
    SociosModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
